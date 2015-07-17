/*
	Bloom filter
	Constructor: new Bloom(k, m, n, hashFunction)
		k is the amount of hashes
		m is the amount of bits in the array, defaults to 1000
		n is the expected amount of items, defaults to 100
		hashFunction is a function which returns a hexadecimal string - defaults to SHA1
	Methods
		insert(string): inserts a string into the bloom filter, returns true
		contains(string): returns true if the filter contains the string, otherwise returns false
*/

function Bloom(k, m, n, hashFunction){

	if(!m)
		m = 1000

	this.m = m;

	if(!n)
		n = 100

	this.n = n;

	if(!k)
		k = Math.max(Math.round(m / n * Math.LN2), 1)

	this.k = k;

	if(!hashFunction)
		hashFunction = function(string){
			return hex_sha1(string);
		}

	this.hashFunction = hashFunction

	this.array = new Int8Array(m);

	this.insert = function(string){

		for(var i = 0; i < this.k; i++){

			var index = parseInt(this.hashFunction(i + string), 16) % this.array.length

			this.array[index] = 1;
		}

		return true;
	}

	this.contains = function(string){
		for(var i = 0; i < this.k; i++){
			var index = parseInt(this.hashFunction(i + string), 16) % this.array.length
			if(this.array[index] == 0)
				return false;
		}
		return true;	
	}

}

//sha1, from http://pajhome.org.uk/crypt/md5/sha1.html and minified with https://marijnhaverbeke.nl/uglifyjs
function hex_sha1(a){return rstr2hex(rstr_sha1(str2rstr_utf8(a)))}function b64_sha1(a){return rstr2b64(rstr_sha1(str2rstr_utf8(a)))}function any_sha1(a,b){return rstr2any(rstr_sha1(str2rstr_utf8(a)),b)}function hex_hmac_sha1(a,b){return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(a),str2rstr_utf8(b)))}function b64_hmac_sha1(a,b){return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(a),str2rstr_utf8(b)))}function any_hmac_sha1(a,b,c){return rstr2any(rstr_hmac_sha1(str2rstr_utf8(a),str2rstr_utf8(b)),c)}function sha1_vm_test(){return"a9993e364706816aba3e25717850c26c9cd0d89d"==hex_sha1("abc").toLowerCase()}function rstr_sha1(a){return binb2rstr(binb_sha1(rstr2binb(a),8*a.length))}function rstr_hmac_sha1(a,b){var c=rstr2binb(a);c.length>16&&(c=binb_sha1(c,8*a.length));for(var d=Array(16),e=Array(16),f=0;16>f;f++)d[f]=909522486^c[f],e[f]=1549556828^c[f];var g=binb_sha1(d.concat(rstr2binb(b)),512+8*b.length);return binb2rstr(binb_sha1(e.concat(g),672))}function rstr2hex(a){try{}catch(b){hexcase=0}for(var e,c=hexcase?"0123456789ABCDEF":"0123456789abcdef",d="",f=0;f<a.length;f++)e=a.charCodeAt(f),d+=c.charAt(15&e>>>4)+c.charAt(15&e);return d}function rstr2b64(a){try{}catch(b){b64pad=""}for(var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d="",e=a.length,f=0;e>f;f+=3)for(var g=a.charCodeAt(f)<<16|(e>f+1?a.charCodeAt(f+1)<<8:0)|(e>f+2?a.charCodeAt(f+2):0),h=0;4>h;h++)d+=8*f+6*h>8*a.length?b64pad:c.charAt(63&g>>>6*(3-h));return d}function rstr2any(a,b){var e,f,g,h,c=b.length,d=Array(),i=Array(Math.ceil(a.length/2));for(e=0;e<i.length;e++)i[e]=a.charCodeAt(2*e)<<8|a.charCodeAt(2*e+1);for(;i.length>0;){for(h=Array(),g=0,e=0;e<i.length;e++)g=(g<<16)+i[e],f=Math.floor(g/c),g-=f*c,(h.length>0||f>0)&&(h[h.length]=f);d[d.length]=g,i=h}var j="";for(e=d.length-1;e>=0;e--)j+=b.charAt(d[e]);var k=Math.ceil(8*a.length/(Math.log(b.length)/Math.log(2)));for(e=j.length;k>e;e++)j=b[0]+j;return j}function str2rstr_utf8(a){for(var d,e,b="",c=-1;++c<a.length;)d=a.charCodeAt(c),e=c+1<a.length?a.charCodeAt(c+1):0,d>=55296&&56319>=d&&e>=56320&&57343>=e&&(d=65536+((1023&d)<<10)+(1023&e),c++),127>=d?b+=String.fromCharCode(d):2047>=d?b+=String.fromCharCode(192|31&d>>>6,128|63&d):65535>=d?b+=String.fromCharCode(224|15&d>>>12,128|63&d>>>6,128|63&d):2097151>=d&&(b+=String.fromCharCode(240|7&d>>>18,128|63&d>>>12,128|63&d>>>6,128|63&d));return b}function str2rstr_utf16le(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(255&a.charCodeAt(c),255&a.charCodeAt(c)>>>8);return b}function str2rstr_utf16be(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(255&a.charCodeAt(c)>>>8,255&a.charCodeAt(c));return b}function rstr2binb(a){for(var b=Array(a.length>>2),c=0;c<b.length;c++)b[c]=0;for(var c=0;c<8*a.length;c+=8)b[c>>5]|=(255&a.charCodeAt(c/8))<<24-c%32;return b}function binb2rstr(a){for(var b="",c=0;c<32*a.length;c+=8)b+=String.fromCharCode(255&a[c>>5]>>>24-c%32);return b}function binb_sha1(a,b){a[b>>5]|=128<<24-b%32,a[(b+64>>9<<4)+15]=b;for(var c=Array(80),d=1732584193,e=-271733879,f=-1732584194,g=271733878,h=-1009589776,i=0;i<a.length;i+=16){for(var j=d,k=e,l=f,m=g,n=h,o=0;80>o;o++){c[o]=16>o?a[i+o]:bit_rol(c[o-3]^c[o-8]^c[o-14]^c[o-16],1);var p=safe_add(safe_add(bit_rol(d,5),sha1_ft(o,e,f,g)),safe_add(safe_add(h,c[o]),sha1_kt(o)));h=g,g=f,f=bit_rol(e,30),e=d,d=p}d=safe_add(d,j),e=safe_add(e,k),f=safe_add(f,l),g=safe_add(g,m),h=safe_add(h,n)}return Array(d,e,f,g,h)}function sha1_ft(a,b,c,d){return 20>a?b&c|~b&d:40>a?b^c^d:60>a?b&c|b&d|c&d:b^c^d}function sha1_kt(a){return 20>a?1518500249:40>a?1859775393:60>a?-1894007588:-899497514}function safe_add(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function bit_rol(a,b){return a<<b|a>>>32-b}var hexcase=0,b64pad="";