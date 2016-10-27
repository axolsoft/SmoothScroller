/** MIT License
 * Copyright (c) Axolsoft 2016
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
function SmoothScroller(){this.timeouts=[];this.velocity=0}
SmoothScroller.prototype={_getCurrentYPos:function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},_getElementYPos:function(b){var a=document.getElementById(b);for(b=a.offsetTop;a.offsetParent&&a.offsetParent!=document.body;)a=a.offsetParent,b+=a.offsetTop;return b},scrollToId:function(b,a){a||(a=.66);var e=this._getCurrentYPos(),c=this._getElementYPos(b),d=
0;if(0<this.timeouts.length)for(var f=this.timeouts.length,d=0;d<f;d++)clearTimeout(this.timeouts[d]);d=0;c>e?(e+=Math.pow(c-1*e,a),this.runFrame(e,c,a,8.6666666667,0,function(a,b,c){return.2*Math.pow(b-1*a,c)},"down")):c<e&&(e-=Math.pow(e-1*c,a),this.runFrame(e,c,a,8.6666666667,0,function(a,b,c){return-.2*Math.pow(a-1*b,c)},"up"))},runFrame:function(b,a,e,c,d,f,g){var h=this,k=(new Date).getTime();0>d&&(c+=d,0>c&&(c=0));this.timeouts.push(setTimeout(function(){window.scrollTo(0,b);h.timeouts.splice(0,
1);b+=f(b,a,e);var d=(new Date).getTime(),d=c-(d-k);0<d&&(d=0);"down"===g&&b<a?h.runFrame(b,a,e,c,d,f,g):"up"===g&&a<b&&h.runFrame(b,a,e,c,d,f,g)},c))}};SmoothScroller=new SmoothScroller;
