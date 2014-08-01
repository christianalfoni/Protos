(function (window) {

  var validArguments = function (args)  {
    if (args.length >= 2 && typeof args[0] === 'string' && typeof args[1] === 'function') {
      return true;
    } else {
      return false;
    }
  };
  
  var isProtosObject = function (proto) {
    return proto.proto;
  };
  
  var createEmptyConstructor = function (name) {
    return new Function('return function ' + name + ' () {}')();
  };
  
  var renameConstructor = function (name, constructor) {
    return new Function(constructor.toString().replace('function', 'return function ' + name + ' '))();
  };
  
  var addConstructorTo = function (proto, Constr) {
    Object.defineProperty(proto, 'constructor', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: Constr
    })
  };
  
  window.Protos = function (name, Proto, existingPrototype) {
    if (!validArguments(arguments)) {
      throw new Error('You are not passing valid arguments!');
    }
    
    Proto = renameConstructor(name, Proto);
    var inheritedPrototype = existingPrototype || Object.prototype;

    var Constr = createEmptyConstructor(name);
    var prototype = new Proto();
    if (isProtosObject(prototype)) {
      Constr = prototype.constr ? renameConstructor(name, prototype.constr) : Constr;
      prototype.proto.prototype = inheritedPrototype;
      prototype = new prototype.Prototype();
      Constr.prototype = prototype;
    } else {
      Proto.prototype = inheritedPrototype;
      Constr = Proto;
    }
    
    Constr.extend = function (name, Proto) {
      if (this.prototype === Object.prototype) {
        throw new Error('The following constructor does not have a prototype defined, you can not extend it: ' + this);
      }
      return Protos(name, Proto, this.prototype);

    };
    addConstructorTo(prototype, Constr);
    return Constr;
  };

}(window));