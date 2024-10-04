class Bucket{
    constructor(hash_code=null, key=null,value=null){
        this.hash_code = hash_code
        this.value = value
        this.key = key
    }
}
// Will not use the modulus
class HashMap {
    constructor() {
        this.load_factor = 0.8
        this.capacity = 16
        this.items = 0
        this.buckets = []
    }

    upgrade_buckets(){
        //I really dont know what name to use to adapt (-_-)
        let divisor = this.capacity * this.load_factor

        if ((this.items/divisor) < 0.75){
            return false
        }return true
    }

    expand_buckets(){
        console.log("Expanding container")
        this.capacity += 16
        let new_buckets = []

        for (let index = 0; index < this.buckets.length; index++) {
            new_buckets[index] = this.buckets[index]
        }
        this.buckets = new_buckets
    }

    set(key, value){
        // Check the size before adding a new value to the buckets
        if (this.upgrade_buckets()){
            // Create a new bucket container
            this.expand_buckets()
        }
        
        let hash_code = hash(key)
        let index = hash_code % this.capacity
        console.log(`Index : ${index}`)

        // Check existence of bucket
        this.buckets[index] = new Bucket(hash_code,key, value)
        this.items++
    }
    get(key){
        // Returns corresponding value
        let hash_code = hash(key)
        for (let index = 0; index < this.buckets.length; index++) {
            const element = this.buckets[index];
            if (element && element.hash_code == hash_code){
                // Found it
                return element.value
            }
        }return null
    }
    
    has(key){
        // Returns bool, key existence
        let hash_code = hash(key)
        for (let index = 0; index < this.buckets.length; index++) {
            const element = this.buckets[index];
            if (element && element.hash_code == hash_code){
                // Found it
                return true
            }
        }return false
    }

    remove(key){
        // removes key and return true : false
        let hash_code = hash(key)
        for (let index = 0; index < this.buckets.length; index++) {
            const element = this.buckets[index];
            if (element && element.hash_code == hash_code){
                // Found it
                this.buckets.splice(index,1)
                this.items--
                return true
            }
        }return false
    }

    length(){
        let counter = 0
        for (let index = 0; index < this.buckets.length; index++) {
            const element = this.buckets[index];
            if (element){
                // Found it
                counter++
            }
        }return counter

    }

    clear(){
        // Removes everything
        this.buckets = []
        this.item = 0
    }

    keys(){
        // Returns array containing all keys
        let keys = []
        for (let index = 0; index < this.buckets.length; index++) {
            const element = this.buckets[index];
            if (element){
                // Found it
                keys.push(element.key)
            }
        }return keys
    }
    values(){
        // Returns array containing all keys
        let values = []
        for (let index = 0; index < this.buckets.length; index++) {
            const element = this.buckets[index];
            if (element){
                // Found it
                values.push(element.value)
            }
        }return values
    }

    entries(){
        // Returns array containing all keys
        let entries = []
        for (let index = 0; index < this.buckets.length; index++) {
            const element = this.buckets[index];
            if (element){
                // Found it
                entries.push([element.key,element.value])
            }
        }return entries
    }
}


function hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
 
    return hashCode;
  }

const test = new HashMap()
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.length())