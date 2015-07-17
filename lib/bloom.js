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