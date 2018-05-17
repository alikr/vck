var vck = require('../dist/vck.js');
var assert = require('assert');
var expect = require('chai').expect;

describe('vck.dist', function() {
  it('[0, 0] 到 [3, 4]的距离 5', function() {
    expect(vck.dist(0,0,3,4)).equal(5);
  });
});

describe('vck.rgb', function() {
  it('#f00 => { r: 255, g: 0, b: 0, opacity: 1 }', function() {
    expect(vck.rgb('#f00')).to.deep.equal({ r: 255, g: 0, b: 0, opacity: 1 });
  });
});

describe('vck.colors', function() {
  it('colors(1):#61A5E8', function() {
    expect(vck.colors(1)).equal('#61A5E8');
  });

  it('colors(2):#EECB5F', function() {
    expect(vck.colors(2)).equal('#EECB5F');
  });
});

describe('vck.rgbaString', function() {
  it('#f00 => rgba(255,0,0,0.5)', function() {
    expect(vck.rgbaString('#f00', 0.5)).equal('rgba(255,0,0,0.5)');
  });
});

describe('贝赛尔曲线', function() {
	describe('2次曲线', function() {
		it('控制点', function() {
	    expect(vck.getBezierCtrls([[0, 0], [3, 4]], 0.3)).to.deep.equal([2.7, 1.1]);
	  });

	  it('t为0坐标', function() {
	    expect(vck.getBezierCurve(0, [[0, 0], [3, 4], [2.7, 1.1]])).to.deep.equal([0, 0]);
	  });

	  it('t为1坐标', function() {
	    expect(vck.getBezierCurve(1, [[0, 0], [3, 4], [2.7, 1.1]])).to.deep.equal([3, 4]);
	  });
	});
  
	describe('1次曲线', function() {
	  it('t为0坐标', function() {
	    expect(vck.getBezierLine(0, [[0, 0], [3, 4]])).to.deep.equal([0, 0]);
	  });

	  it('t为1坐标', function() {
	    expect(vck.getBezierLine(1, [[0, 0], [3, 4]])).to.deep.equal([3, 4]);
	  });
	});
});

describe('vck.timestamp', function() {
  it('10位时间戳：1521007319598 => 1521007319', function() {
    expect(vck.timestamp(1521007319598)).equal(1521007319);
  });
});

describe('vck.parse2Date', function() {
	it('Date => Date', function() {
  	var now = new Date;
    expect(vck.parse2Date(now)).deep.equal(now);
  });

  it('数字1521007319598 => Date', function() {
    expect(vck.parse2Date(1521007319598)).deep.equal(new Date(1521007319598));
  });

  it('字符1521007319598 => Date', function() {
    expect(vck.parse2Date('1521007319598')).deep.equal(new Date(1521007319598));
  });

  it('2012-12-12 12:00:00 => Date', function() {
    expect(vck.parse2Date('2012-12-12 12:00:00')).deep.equal(new Date('2012-12-12 12:00:00'));
  });
});
