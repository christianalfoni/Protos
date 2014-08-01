Protos
======

Inheritance the native JavaScript way

# Background

Read my article on JavaScript inheritance and find out why I built this:

[www.christianalfoni.com](http://www.christianalfoni.com/javascript/2014/07/30/2014-07-30-solving-javascript-inheritance.html)

# Syntax

When defining an object that is a component of your application I believe it is always best to use the constructor approach and the reason for that is private variables. In the code below only methods that other parts of the application is going to use is exposed. This makes it easier to understand what the object is supposed to do and you can group private functions with exposed methods. 

### Simple object definition
This syntax does not include a prototype. This will be a simple constructor. The prototype will be "Object.prototype". In practical terms it means that all instances will have their own set of all of these properties. Often you only need one instance, or very few. This is the way to go:

```javascript
var MyObject = Protos('MyObject', function () {
  
  var calculateSomething = function () {};
  var cleanCalculation = function () {};
  this.doSomething = function (data) {
    calculateSomething(data);
    return cleanCalculation(data);
  };
  
  var doingSomethingElse = function () {};
  this.doThis = function () {
    var obj = {};
    doingSomethingElse(obj);
    return obj;
  };
  
});
new MyObject(); // => MyObject { doSomething: function... , doThis: function... }  
```

### Creating a prototype
As discussed in the article, this library takes the approach that native JavaScript does. First building a prototype of your object, then expose a constructor that holds an instance of the prototype on the its prototype property. To build such a structure do the following:

```javascript
var MyObject = Protos('MyObject', function () {
  
  return {
    Prototype: function () {
      
      this.defaultValue = 'test';
      this.doSomething = function () {};
      
    }
  };
  
});
var obj = new MyObject(); // => MyObject {}
obj.__proto__ // => MyObject.Prototype { defaultValue: 'test', doSomething: function... }
```

### Creating a constructor for the prototype
When defining a Prototype you probably need a constructor to handle the instantiation to set custom properties etc. This is how you do it:

```javascript
var MyObject = Protos('MyObject', function () {
  
  return {
    Prototype: function () {
      
      this.defaultValue = 'test';
      this.doSomething = function () {};
      
    },
    Constructor: function (options) {
    
      options = options || {};
      this.value = options.value || this.defaultValue;
    
    }
  };
  
});
var obj = new MyObject({value: 'something'}); // => MyObject { value: 'something' }
obj.__proto__ // => MyObject.Prototype { defaultValue: 'test', doSomething: function... }
```

As you can see you get a very natural naming of your instance and the prototype. It is also more natural to use the prototype as a way of setting default values.

### Inheriting prototypes
You might need to to create a base prototype that other prototypes can inherit from. This is how you would do that:

```javascript
var MyBasic = Protos('MyBasic', function () {
  
  return {
    Prototype: function () {
      
      this.defaultValue = 'test';
      this.doSomething = function () {};
      
    }
  };
  
});
var MyExtended = MyBasic.extend('MyExtended', function () {
  this.doThis = function () {};
});
var obj = new MyExtended(); // => MyExtended { doThis: function... }
obj.__proto__ // => MyBasic.Prototype { defaultValue: 'test', doSomething: function... }
```

Again you see a very natural named prototype chain.

As stated in the article I believe there is much confusion on what a prototype, prototype chain and inheritance really is. The prototype is an instance of an object you have defined. The constructors only job is to instantiate a new object, not define it. That is at least the approach of this lib :-)
