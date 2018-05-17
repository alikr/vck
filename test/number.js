var vck = require("../dist/vck.js");
var assert = require("assert");
var expect = require("chai").expect;

describe("vck.round", function() {
  it("3.1415926 => 3", function() {
    expect(vck.round(3.1415926)).equal(3);
  });

  it("3.1415926 => 3.14", function() {
    expect(vck.round(3.1415926, 2)).equal(3.14);
  });
});

describe("vck.num2SI", function() {
  it("默认2位精度：1024 => 1.02KB", function() {
    expect(vck.num2SI(1024)).equal("1.02KB");
  });

  it("3位精度：1024 => 1.024KB", function() {
    expect(vck.num2SI(1024, 3)).equal("1.024KB");
  });

  it("800.829182 => 800.83B", function() {
    expect(vck.num2SI(800.829182)).equal("800.83B");
  });
});

describe("vck.num2CN", function() {
  it("1024 => 1024", function() {
    expect(vck.num2CN(1024)).equal("1024");
  });

  it("10024 => 1万", function() {
    expect(vck.num2CN(10024)).equal("1万");
  });

  it("11024 => 1.1万", function() {
    expect(vck.num2CN(11024)).equal("1.1万");
  });
});

describe("vck.formatNumber", function() {
  it("2078900 => 2.08M", function() {
    expect(vck.formatNumber(2078900, 2).string()).deep.equal("2.08M");
  });
  it("2078900 => 2.08MB", function() {
    expect(vck.formatNumber(2078900, 2, "B").string()).deep.equal("2.08MB");
  });
});

describe("vck.formatNumberByUnit", function() {
  it("2.08B => 0M", function() {
    expect(vck.formatNumberByUnit(2.08, "M")).deep.equal(0);
  });
  it("2.08B => 0K", function() {
    expect(vck.formatNumberByUnit(2.08, "K")).deep.equal(0);
  });
  it("2080B => 2.08K", function() {
    expect(vck.formatNumberByUnit(2080, "K")).deep.equal(2.08);
  });
  it("2000000B => 2M", function() {
    expect(vck.formatNumberByUnit(2000000, "M")).deep.equal(2);
  });
});
