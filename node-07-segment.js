const Segment = require('segment');

let seg = new Segment();

seg.useDefault();

let str="今天双十一，心情还可以，大家一起好好学习";

console.log(seg.doSegment(str));