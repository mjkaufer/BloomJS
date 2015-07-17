# BloomJS

A JavaScript implementation of the Bloom Filter

## Usage

	Constructor: `var bloom = new Bloom(k, m, n, hashFunction)`
		`k`: amount of hashes, defaults to `Math.max(Math.round(m / n * Math.LN2), 1)`
		`m`: amount of bits in the array, defaults to `1000`
		`n`: expected amount of items, defaults to `100`
		`hashFunction`: a function which returns a hexadecimal string - defaults to a `SHA1` function
		Simply passing no arguments to the constructor should work for simple cases

	Methods:
		`bloom.insert(string)`: Inserts `string` into the bloom filter, returns `true`
		`bloom.contains(string)`: Checks if the filter contains `string`, returns `true` if it does, otherwise returns `false`

## Contributing

	If you have any ideas or suggestions for optimization, leave an issue or submit a pull request!