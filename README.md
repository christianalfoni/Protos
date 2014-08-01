Protos
======

Inheritance the native JavaScript way

# Background

Read my article on JavaScript inheritance and find out why I built this:

[www.christianalfoni.com](http://christianalfoni.github.io/javascript/2014/07/30/why-javascript-inheritance-is-so-difficult-to-understand.html)

# Syntax

When defining an object that is a component of your application I believe it is always best to use the constructor approach and the reason for that is private variables and debug info. In the code below only methods that other parts of the application is going to use is exposed. This makes it easier to understand what the object is supposed to do and you can group private functions with exposed methods. 

### Simple object definition
This syntax defines a prototype constructor. The prototype objects prototype will be "Object.prototype". In practical terms it means that all instances will share whatever is defined here.

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
var myObject = new MyObject();
myObject; // => MyObject {}
myObject.__proto__ // => MyObjectPrototype { doSomething: function... , doThis: function... }
```

### Creating a constructor
As discussed in the article, this library takes the approach that native JavaScript does. First building a prototype of your object, then expose a constructor that holds an instance of the prototype on the its prototype property. To build such a structure do the following:

```javascript
var MyObject = Protos('MyObject', function (options) {
  options = options || {};
  if (options.value) this.value = options.value;
}, function () {
  this.value = 'test';
  this.doSomething = function () {};
});
var obj = new MyObject(); // => MyObject {}
var obj2 = new MyObject({value: 'superman'}); // => MyObject { value: 'superman' }
obj.__proto__ // => MyObjectPrototype { value: 'test', doSomething: function... }
obj2.__proto__ // => MyObjectPrototype { value: 'test', doSomething: function... }
```
As you can see you get a very natural naming of your instance and the prototype. It is also more natural to use the prototype as a way of setting default values.

### Inheriting prototypes
You might need to to create a base prototype that other prototypes can inherit from. This is how you would do that:

```javascript
var MyBasic = Protos('MyBasic', function () {
  this.defaultValue = 'test';
  this.doSomething = function () {};
});
var MyExtended = MyBasic.extend('MyExtended', function () {
  this.doThis = function () {};
});
var obj = new MyExtended(); // => MyExtended {}
obj.__proto__ // => MyExtended.Prototype { doThis: function... }
obj.__proto__.__proto__ // => MyBasic.Prototype { defaultValue: 'test', doSomething: function... }
```

Again you see a very natural named prototype chain.

As stated in the article I believe there is much confusion on what a prototype, prototype chain and inheritance really is. The way I see it is that the prototype is an instance of an object you have defined. The traditional constructors only job is to instantiate a new object, not define it. That is at least the approach of this lib :-)
