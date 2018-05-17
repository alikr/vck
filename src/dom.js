/**
 * 引用 https://github.com/ElemeFE/element/blob/dev/src/utils/dom.js
 */
const root = typeof window === "object" && window;
const DEFAULTS = {
  placement: "bottom",
  offset: 0,
  forceAbsolute: false
};

function getScrollParent(element) {
  var parent = element.parentNode;

  if (!parent) {
    return element;
  }

  if (parent === root.document) {
    // Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
    // greater than 0 and return the proper element
    if (root.document.body.scrollTop || root.document.body.scrollLeft) {
      return root.document.body;
    } else {
      return root.document.documentElement;
    }
  }

  // Firefox want us to check `-x` and `-y` variations as well
  if (
    ["scroll", "auto"].indexOf(getStyleComputedProperty(parent, "overflow")) !==
      -1 ||
    ["scroll", "auto"].indexOf(
      getStyleComputedProperty(parent, "overflow-x")
    ) !== -1 ||
    ["scroll", "auto"].indexOf(
      getStyleComputedProperty(parent, "overflow-y")
    ) !== -1
  ) {
    // If the detected scrollParent is body, we perform an additional check on its parentNode
    // in this way we'll get body if the browser is Chrome-ish, or documentElement otherwise
    // fixes issue #65
    return parent;
  }
  return getScrollParent(element.parentNode);
}

function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
  var elementRect = getBoundingClientRect(element);
  var parentRect = getBoundingClientRect(parent);

  if (fixed) {
    var scrollParent = getScrollParent(parent);
    parentRect.top += scrollParent.scrollTop;
    parentRect.bottom += scrollParent.scrollTop;
    parentRect.left += scrollParent.scrollLeft;
    parentRect.right += scrollParent.scrollLeft;
  }

  var rect = {
    top: elementRect.top - parentRect.top,
    left: elementRect.left - parentRect.left,
    bottom: elementRect.top - parentRect.top + elementRect.height,
    right: elementRect.left - parentRect.left + elementRect.width,
    width: elementRect.width,
    height: elementRect.height
  };
  return rect;
}

function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent;
  return offsetParent === root.document.body || !offsetParent
    ? root.document.documentElement
    : offsetParent;
}

function getOuterSizes(element) {
  // NOTE: 1 DOM access here
  var _display = element.style.display,
    _visibility = element.style.visibility;
  element.style.display = "block";
  element.style.visibility = "hidden";
  var calcWidthToForceRepaint = element.offsetWidth;

  // original method
  var styles = root.getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };

  // reset element styles
  element.style.display = _display;
  element.style.visibility = _visibility;
  return result;
}

function getStyleComputedProperty(element, property) {
  // NOTE: 1 DOM access here
  var css = root.getComputedStyle(element, null);
  return css[property];
}

function isFixed(element) {
  if (element === root.document.body) {
    return false;
  }
  if (getStyleComputedProperty(element, "position") === "fixed") {
    return true;
  }
  return element.parentNode ? isFixed(element.parentNode) : element;
}

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();

  // whether the IE version is lower than 11
  var isIE = navigator.userAgent.indexOf("MSIE") != -1;

  // fix ie document bounding top always 0 bug
  var rectTop =
    isIE && element.tagName === "HTML" ? -element.scrollTop : rect.top;

  return {
    left: rect.left,
    top: rectTop,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rectTop
  };
}

function getPosition(popper, reference) {
  var container = getOffsetParent(reference);

  if (DEFAULTS.forceAbsolute) {
    return "absolute";
  }

  // Decide if the popper will be fixed
  // If the reference element is inside a fixed context, the popper will be fixed as well to allow them to scroll together
  var isParentFixed = isFixed(reference, container);
  return isParentFixed ? "fixed" : "absolute";
}

export function getOffsets(popper, reference, placement) {
  placement = placement.split("-")[0];
  var popperOffsets = {};
  let position = getPosition(popper, reference);
  popperOffsets.position = position;
  var isParentFixed = popperOffsets.position === "fixed";

  //
  // Get reference element position
  //
  var referenceOffsets = getOffsetRectRelativeToCustomParent(
    reference,
    getOffsetParent(popper),
    isParentFixed
  );

  //
  // Get popper sizes
  //
  var popperRect = getOuterSizes(popper);

  //
  // Compute offsets of popper
  //

  // depending by the popper placement we have to compute its offsets slightly differently
  if (["right", "left"].indexOf(placement) !== -1) {
    popperOffsets.top =
      referenceOffsets.top +
      referenceOffsets.height / 2 -
      popperRect.height / 2;
    if (placement === "left") {
      popperOffsets.left = referenceOffsets.left - popperRect.width;
    } else {
      popperOffsets.left = referenceOffsets.right;
    }
  } else {
    popperOffsets.left =
      referenceOffsets.left + referenceOffsets.width / 2 - popperRect.width / 2;
    if (placement === "top") {
      popperOffsets.top = referenceOffsets.top - popperRect.height;
    } else {
      popperOffsets.top = referenceOffsets.bottom;
    }
  }

  // Add width and height to our offsets object
  popperOffsets.width = popperRect.width;
  popperOffsets.height = popperRect.height;

  return {
    popper: popperOffsets,
    reference: referenceOffsets
  };
}

export function isEqualDom(currentDom, otherDom) {
  if (currentDom === document.body) return false;
  if (currentDom === otherDom) return true;
  return isEqualDom(currentDom.parentNode, otherDom);
}
