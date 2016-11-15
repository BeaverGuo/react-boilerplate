/*design pattern notes:
1.introduction:
OO:需要考虑类的粒度,接口与继承关系,未来拓展,避免重新设计
要敢于使用面向对象
不要一开始就想新的方法去解决,学会复用,DRY
One thing expert designers know not to do is solve every problem from first 
principles. Rather, they reuse solutions that have worked for them in the past. 
basing new designs on prior experience.
object-oriented designers follow patterns like "represent states 
with objects" and "decorate objects so you can easily add/remove features." Once 
you know the pattern, a lot of design decisions follow automatically. 
If you could remember the details of the previous problem and how 
you solved it, then you could reuse the experience instead of rediscovering it.
how to represent algorithms as objects.
The design patterns in this book are descriptions of communicating objects and classes that are customized to solve 
a general design problem in a particular context. 
MVC consists of three kinds of objects. The Model is the application object, the 
View is its screen presentation, and the Controller defines the way the user 
interface reacts to user input. Before MVC, user interface designs tended to lump 
these objects together. MVC decouples them to increase flexibility and reuse. 
Model是不是可以看成数据object,而controller看成改变M(数据)的控制器,View则是Model的视图
MVC decouples views and models by establishing a subscribe/notify protocol between 
them. A view must ensure that its appearance reflects the state of the model. 
Whenever the model's data changes, the model notifies views that depend on it. 
In response, each view gets an opportunity to update itself. This approach lets 
you attach multiple views to a model to provide different presentations. You can 
also create new views for a model without rewriting it. 
这样看Model有点像redux的全局store.
Observer pattern:
多个views共一个model,解耦之后改变一个-->Model至其他views发生相应变化
MVC supports nested views with the CompositeView class, 
a subclass of View. CompositeView objects act just like View objects; a composite 
view can be used wherever a view can be used, but it also contains and manages 
nested views.

Composite (183) design pattern. It lets you create a class hierarchy in which 
some subclasses define primitive objects (e.g., Button) and other classes define 
composite objects (CompositeView) that assemble the primitives into more complex 
objects. 
组合优于继承
MVC also lets you change the way a view responds to user input without changing 
its visual presentation. You might want to change the way it responds to the keyboard, 
for example, or have it use a pop-up menu instead of command keys. MVC encapsulates 
the response mechanism in a Controller object. There is a class hierarchy of 
controll

 For example, 
a view can be disabled so that it doesn't accept input simply by giving it a 
controller that ignores input events.

MVC uses other design patterns, such as Factory Method (121) to specify the default 
controller class for a view and Decorator (196) to add scrolling to a view. But 
the main relationships in MVC are given by the Observer, Composite, and Strategy 
design patterns. 

first criterion of design pattern:
purpose:creational,structural or behavioral purpose
创建，组合，行为
 Creational patterns concern the process of 
object creation. Structural patterns deal with the composition of classes or 
objects. Behavioral patterns characterize the ways in which classes or objects 
interact and distribute responsibility. 

second criterion of design pattern:
scope: specify whether the pattern applies to classes or objects.
Class patterns deal with relationships between 
classes and their subclasses. These relationships are established through 
inheritance, so they are static—fixed at compile-time. Object patterns deal with 
object relationships, which can be changed at run-time and are more dynamic. Almost 
all patterns use inheritance to some extent. So the only patterns labeled "class 
patterns" are those that focus on class relationships. Note that most patterns 
are in the Object scope. 
类是静态，对象是动态

 Composite is often used with Iterator or Visitor.
 像是mixin?
 设计模式如何解决问题?
Requests are the only way to get an object to execute an operation. Operations 
are the only way to change an object's internal data. Because of these restrictions, 
the object's internal state is said to be encapsulated; it cannot be accessed 
directly, and its representation is invisible from outside the object. 
所以这样才有getter and setter吗?
The hard part about object-oriented design is decomposing a system into objects. 
The task is difficult because many factors come into play: encapsulation, 
granularity, dependency, flexibility, performance, evolution, reusability, and 
on and on. They all influence the decomposition, often in conflicting ways. 

Object-oriented design methodologies favor many different approaches. You can 
write a problem statement, single out the nouns and verbs, and create corresponding 
classes and operations. Or you can focus on the collaborations and responsibilities 
in your system. Or you can model the real world and translate the objects found 
during analysis into design. There will always be disagreement on which approach 
is best.
名词和动词是个好比喻
An object performs an operation when it receives a request 
(or message) from a client.比如说数据更新,调用方法等等
the Composite (183) pattern introduces an abstraction for treating objects 
uniformly that doesn't have a physical counterpart. Strict modeling of the real 
world leads to a system that reflects today's realities but not necessarily 
tomorrow's. The abstractions that emerge during design are key to making a design 
flexible. 
this does scale
 The Strategy 
(349) pattern describes how to implement interchangeable families of algorithms. 
The State (338) pattern represents each state of an entity as an object. These 
objects are seldom found during analysis or even the early stages of design; they're 
discovered later in the course of making a design more flexible and reusable. 

 The Facade (208) pattern describes 
how to represent complete subsystems as objects, and the Flyweight (218) pattern 
describes how to support huge numbers of objects at the finest granularities.

Type
A type is a name used to denote a particular interface. We speak of an object 
as having the type "Window" if it accepts all requests for the operations defined 
in the interface named "Window.

 Two objects of the same type need only 
share parts of their interfaces. Interfaces can contain other interfaces as subsets. 
We say that a type is a subtype of another if its interface contains the interface 
of its supertype. Often we speak of a subtype inheriting the interface of its 
supertype. 

Interfaces are fundamental in object-oriented systems. Objects are known only 
through their interfaces. There is no way to know anything about an object or 
to ask it to do anything without going through its interface. An object's interface 
says nothing about its implementation—different objects are free to implement 
requests differently.

 The run-time association of a request to an object 
and one of its operations is known as dynamic binding. 
表示是动态执行的,并不是在对象声明阶段,而是在调用阶段

Dynamic binding means that issuing a request doesn't commit you to a particular 
implementation until run-time. Consequently, you can write programs that expect 
an object with a particular interface, knowing that any object that has the correct 
interface will accept the request. Moreover, dynamic binding lets you substitute 
objects that have identical interfaces for each other at run-time. This 
substitutability is known as polymorphism, and it's a key concept in 
object-oriented systems.
It lets a client object make few assumptions about other 
objects beyond supporting a particular interface.
 Polymorphism simplifies the 
definitions of clients, decouples objects from each other, and lets them vary 
their relationships to each other at run-time.

Objects are created by instantiating a class. The object is said to be an instance 
of the class. The process of instantiating a class allocates storage for the 
object's internal data (made up of instance variables) and associates the 
operations with these data. Many similar instances of an object can be created 
by instantiating a class. 

An abstract class is one whose main purpose is to define a common interface for 
its subclasses. An abstract class will defer some or all of its implementation 
to operations defined in subclasses; hence an abstract class cannot be instantiated.

The operations that an abstract class declares but doesn't implement are called 
abstract operations. Classes that aren't abstract are called concrete classes.
类似一种保护机制吗?

A mixin class is a class that's intended to provide an optional interface or 
functionality to other classes.

It's important to understand the difference between an object's class and its 
type. 
An object's class defines how the object is implemented. The class defines the 
object's internal state and the implementation of its operations. In contrast, 
an object's type only refers to its interface—the set of requests to which it 
can respond. An object can have many types, and objects of different classes can 
have the same type. 

Of course, there's a close relationship between class and type. Because a class 
defines the operations an object can perform, it also defines the object's type. 
When we say that an object is an instance of a class, we imply that the object 
supports the interface defined by the class.


It's also important to understand the difference between class inheritance and 
interface inheritance (or subtyping). Class inheritance defines an object's 
implementation in terms of another object's implementation. In short, it's a 
mechanism for code and representation sharing. In contrast, interface inheritance 
(or subtyping) describes when an object can be used in place of another. 
接口继承是取代?

Programming to an Interface, not an Implementation
Class inheritance is basically just a mechanism for extending an application's 
functionality by reusing functionality in parent classes. It lets you define a 
new kind of object rapidly in terms of an old one.

However, implementation reuse is only half the story. Inheritance's ability to 
define families of objects with identical interfaces (usually by inheriting from 
an abstract class) is also important. Why? Because polymorphism depends on it. 
When inheritance is used carefully (some will say properly), all classes derived 
from an abstract class will share its interface. This implies that a subclass 
merely adds or overrides operations and does not hide operations of the parent 
class. All subclasses can then respond to the requests in the interface of this 
abstract class, making them all subtypes of the abstract class. 


信息隐藏
There are two benefits to manipulating objects solely in terms of the interface 
defined by abstract classes: 
1.   Clients remain unaware of the specific types of objects they use, as long 
as the objects adhere to the interface that clients expect. 
2.   Clients remain unaware of the classes that implement these objects. Clients 
only know about the abstract class(es) defining the interface. 

This so greatly reduces implementation dependencies between subsystems that it 
leads to the following principle of reusable object-oriented design: 
Program to an interface, not an implementation.  

Don't declare variables to be instances of particular concrete classes. Instead, 
commit only to an interface defined by an abstract class.
这句怎么理解?
Creational patterns ensure 
that your system is written in terms of interfaces, not implementations.

Putting Reuse Mechanisms to Work 
Inheritance versus Composition
The two most common techniques for reusing functionality in object-oriented 
systems are class inheritance and object composition. As we've explained, class 
inheritance lets you define the implementation of one class in terms of another's. 
Reuse by subclassing is often referred to as white-box reuse. The term "white-box" 
refers to visibility: With inheritance, the internals of parent classes are often 
visible to subclasses.
Object composition is an alternative to class inheritance. Here, new functionality 
is obtained by assembling or composing objects to get more complex functionality. 
Object composition requires that the objects being composed have well-defined 
interfaces. This style of reuse is called black-box reuse, because no internal 
details of objects are visible. Objects appear only as "black boxes."
Inheritance and composition each have their advantages and disadvantages. Class 
inheritance is defined statically at compile-time and is straightforward to use, 
since it's supported directly by the programming language. Class inheritance also 
makes it easier to modify the implementation being reused. When a subclass 
overrides some but not all operations, it can affect the operations it inherits 
as well, assuming they call the overridden operations. 
静态类vs动态composite?
But class inheritance has some disadvantages, too. First, you can't change the 
implementations inherited from parent classes at run-time, because inheritance 
is defined at compile-time. Second, and generally worse, parent classes often 
define at least part of their subclasses' physical representation. Because 
inheritance exposes a subclass to details of its parent's implementation, it's 
often said that "inheritance breaks encapsulation"
父类暴露了子类的presentation,这样就不能复用了?破坏了封装性
 The implementation 
of a subclass becomes so bound up with the implementation of its parent class 
that any change in the parent's implementation will force the subclass to change.
子类的detail与父类的implementation有关
这是没有解耦的意思?
Implementation dependencies can cause problems when you're trying to reuse a 
subclass. 
 Should any aspect of the inherited implementation not be appropriate 
for new problem domains, the parent class must be rewritten or replaced by something 
more appropriate.

 This dependency limits flexibility and ultimately reusability.
 One cure for this is to inherit only from abstract classes, since they usually 
provide little or no implementation.

Object composition is defined dynamically at run-time through objects acquiring 
references to other objects. Composition requires objects to respect each others' 
interfaces, which in turn requires carefully designed interfaces that don't stop 
you from using one object with many others. But there is a payoff. Because objects 
are accessed solely through their interfaces, we don't break encapsulation. Any 
object can be replaced at run-time by another as long as it has the same type.

Moreover, because an object's implementation will be written in terms of object 
interfaces, there are substantially fewer implementation dependencies.

Object composition has another effect on system design. Favoring object 
composition over class inheritance helps you keep each class encapsulated and 
focused on one task. Your classes and class hierarchies will remain small and 
will be less likely to grow into unmanageable monsters. On the other hand, a design 
based on object composition will have more objects (if fewer classes), and the 
system's behavior will depend on their interrelationships instead of being defined 
in one class.
Favor object composition over class inheritance.
Ideally, you shouldn't have to create new components to achieve reuse. You should 
be able to get all the functionality you need just by assembling existing components 
through object composition. But this is rarely the case, because the set of 
available components is never quite rich enough in practice. Reuse by inheritance 
makes it easier to make new components that can be composed with old ones. 
Inheritance and object composition thus work together. 
Nevertheless, our experience is that designers overuse inheritance as a reuse 
technique, and designs are often made more reusable (and simpler) by depending 
more on object composition. You'll see object composition applied again and again 
in the design patterns. 

Delegation:
Delegation is a way of making composition as powerful for reuse as inheritance 
In delegation, two objects are involved in handling a request:
a receiving object delegates operations to its delegate. This is analogous to 
subclasses deferring requests to parent classes.
有点类似父子类
 But with inheritance, an 
inherited operation can always refer to the receiving object through the this 
member variable in C++ and self in Smalltalk. To achieve the same effect with 
delegation, the receiver passes itself to the delegate to let the delegated 
operation refer to the receiver. 
For example, instead of making class Window a subclass of Rectangle (because 
windows happen to be rectangular), the Window class might reuse the behavior of 
Rectangle by keeping a Rectangle instance variable and delegating 
Rectangle-specific behavior to it. In other words, instead of a Window being a 
Rectangle, it would have a Rectangle. Window must now forward requests to its 
Rectangle instance explicitly, whereas before it would have inherited those 
operations. 
委托需要实例,这点在JS中用prototype太简单
 a class keeps a reference to an instance 
of another class.

The main advantage of delegation is that it makes it easy to compose behaviors 
at run-time and to change the way they're composed.
Our window can become circular 
at run-time simply by replacing its Rectangle instance with a Circle instance, 
assuming Rectangle and Circle have the same type.

Delegation has a disadvantage it shares with other techniques that make software 
more flexible through object composition: Dynamic, highly parameterized software 
is harder to understand than more static software. There are also run-time 
inefficiencies, but the human inefficiencies are more important in the long run. 
Delegation is a good design choice only when it simplifies more than it complicates. 
It isn't easy to give rules that tell you exactly when to use delegation, because 
how effective it will be depends on the context and on how much experience you have with it. Delegation works best when it's used in highly stylized ways—that 
is, in standard patterns. 

Delegation is an extreme example of object composition. It shows that you can 
always replace inheritance with object composition as a mechanism for code reuse.

Inheritance versus Parameterized Types
Another (not strictly object-oriented) technique for reusing functionality is 
through parameterized types, also known as generics (Ada, Eiffel) and templates 
(C++).

Parameterized types give us a third way (in addition to class inheritance and 
object composition) to compose behavior in object-oriented systems.
There are important differences between these techniques. Object composition lets 
you change the behavior being composed at run-time, but it also requires 
indirection and can be less efficient. Inheritance lets you provide default 
implementations for operations and lets subclasses override them. Parameterized 
types let you change the types that a class can use. But neither inheritance nor 
parameterized types can change at run-time. Which approach is best depends on 
your design and implementation constraints.

Relating Run-Time and Compile-Time Structures
An object-oriented program's run-time structure often bears little resemblance 
to its code structure. The code structure is frozen at compile-time; it consists 
of classes in fixed inheritance relationships. A program's run-time structure 
consists of rapidly changing networks of communicating objects. In fact, the two 
structures are largely independent. Trying to understand one from the other is 
like trying to understand the dynamism of living ecosystems from the static 
taxonomy of plants and animals, and vice versa. 

Consider the distinction between object aggregation and acquaintance and how 
differently they manifest themselves at compile- and run-times. Aggregation 
implies that one object owns or is responsible for another object. Generally we 
speak of an object having or being part of another object. Aggregation implies 
that an aggregate object and its owner have identical lifetimes.

Acquaintance implies that an object merely knows of another object. Sometimes 
acquaintance is called "association" or the "using" relationship. Acquainted 
objects may request operations of each other, but they aren't responsible for 
each other. Acquaintance is a weaker relationship than aggregation and suggests 
much looser coupling between objects. 
这两货实现起来一样
 In C++, aggregation can be implemented by defining member 
variables that are real instances, but it's more common to define them as pointers 
or references to instances. Acquaintance is implemented with pointers and 
references as well. 

Ultimately, acquaintance and aggregation are determined more by intent than by 
explicit language mechanisms. The distinction may be hard to see in the 
compile-time structure, but it's significant. Aggregation relationships tend to 
be fewer and more permanent than acquaintance. Acquaintances, in contrast, are 
made and remade more frequently, sometimes existing only for the duration of an 
operation. Acquaintances are more dynamic as well, making them more difficult 
to discern in the source code

Designing for Change 
The key to maximizing reuse lies in anticipating new requirements and changes 
to existing requirements, and in designing your systems so that they can evolve 
accordingly.

Here are some common causes of redesign along with the design pattern(s) that 
address them:  
1.   Creating an object by specifying a class explicitly. Specifying a class 
name when you create an object commits you to a particular implementation 
instead of a particular interface. This commitment can complicate future 
changes. To avoid it, create objects indirectly.  
Design patterns: Abstract Factory (99), Factory Method (121), Prototype 
(133). 

2.   Dependence on specific operations. When you specify a particular operation, 
you commit to one way of satisfying a request. By avoiding hard-coded 
requests, you make it easier to change the way a request gets satisfied 
both at compile-time and at run-time.  
Design patterns: Chain of Responsibility (251), Command (263).

3.   Dependence on hardware and software platform. External operating system 
interfaces and application programming interfaces (APIs) are different on 
different hardware and software platforms. Software that depends on a 
particular platform will be harder to port to other platforms. It may even 
be difficult to keep it up to date on its native platform. It's important 
therefore to design your system to limit its platform dependencies.  
Design patterns: Abstract Factory (99), Bridge (171).


4.   Dependence on object representations or implementations. Clients that know 
how an object is represented, stored, located, or implemented might need 
to be changed when the object changes. Hiding this information from clients 
keeps changes from cascading.  

5.   Algorithmic dependencies. Algorithms are often extended, optimized, and 
replaced during development and reuse. Objects that depend on an algorithm 
will have to change when the algorithm changes. Therefore algorithms that 
are likely to change should be isolated.  
Design patterns: Builder (110), Iterator (289), Strategy (349), Template 
Method (360), Visitor (366).

6.   Tight coupling. Classes that are tightly coupled are hard to reuse in 
isolation, since they depend on each other. Tight coupling leads to 
monolithic systems, where you can't change or remove a class without 
understanding and changing many other classes. The system becomes a dense 
mass that's hard to learn, port, and maintain.

Loose coupling increases the probability that a class can be reused by itself 
and that a system can be learned, ported, modified, and extended more easily. 
Design patterns use techniques such as abstract coupling and layering to 
promote loosely coupled systems.

Design patterns: Abstract Factory (99), Bridge (171), Chain of 
Responsibility (251), Command (263), Facade (208), Mediator (305), 
Observer (326).

7.   Extending functionality by subclassing. Customizing an object by 
subclassing often isn't easy. Every new class has a fixed implementation 
overhead (initialization, finalization, etc.). Defining a subclass also 
requires an in-depth understanding of the parent class. For example, 
overriding one operation might require overriding another. An overridden 
operation might be required to call an inherited operation. And subclassing 
can lead to an explosion of classes, because you might have to introduce 
many new subclasses for even a simple extension.  


Object composition in general and delegation in particular provide flexible 
alternatives to inheritance for combining behavior. New functionality can 
be added to an application by composing existing objects in new ways rather 
than by defining new subclasses of existing classes. On the other hand, 
heavy use of object composition can make designs harder to understand. Many 
design patterns produce designs in which you can introduce customized 
functionality just by defining one subclass and composing its instances 
with existing ones. 

Design patterns use techniques such as abstract coupling and layering to
promote loosely coupled systems.

8. Inability to alter classes conveniently. Sometimes you have to modify a
class that can't be modified conveniently. Perhaps you need the source code
and don't have it (as may be the case with a commercial class library).
Or maybe any change would require modifying lots of existing subclasses.
Design patterns offer ways to modify classes in such circumstances.
Design patterns: Adapter (157), Decorator (196), Visitor (366).

These examples reflect the flexibility that design patterns can help you build
into your software. How crucial such flexibility is depends on the kind of software
you're building. Let's look at the role design patterns play in the development
of three broad classes of software: application programs, toolkits, and
frameworks.
Application Programs
Design patterns that reduce dependencies can increase internal reuse. Looser coupling
boosts the likelihood that one class of object can cooperate with several others.
For example, when you eliminate dependencies on specific operations by isolating
and encapsulating each operation, you make it easier to reuse an operation in
different contexts. The same thing can happen when you remove algorithmic and
representational dependencies too.

Design patterns also make an application more maintainable when they're used to
limit platform dependencies and to layer a system.

Frameworks

A framework is a set of cooperating classes that make up a reusable design for
a specific class of software [Deu89, JF88]. For example, a framework can be geared
toward building graphical editors for different domains like artistic drawing,
music composition, and mechanical CAD [VL90, Joh92]. Another framework can help
you build compilers for different programming languages and target machines
[JML92]. Yet another might help you build financial modeling applications [BE93].
You customize a framework to a particular application by creating
application-specific subclasses of abstract classes from the framework.


The framework dictates the architecture of your application. It will define the
overall structure, its partitioning into classes and objects, the key
responsibilities thereof, how the classes and objects collaborate, and the thread
of control. A framework predefines these design parameters so that you, the
application designer/implementer, can concentrate on the specifics of your
application. The framework captures the design decisions that are common to its
application domain. Frameworks thus emphasize design reuse over code reuse, though
a framework will usually include concrete subclasses you can put to work
immediately.

Reuse on this level leads to an inversion of control between the application and
the software on which it's based. When you use a toolkit (or a conventional
subroutine library for that matter), you write the main body of the application
and call the code you want to reuse. When you use a framework, you reuse the main
body and write the code it calls. You'll have to write operations with particular
names and calling conventions, but that reduces the design decisions you have
to make.
框架类似帮你搭好架子,写api函数的调用代码,不自由,但是更利于维护
Not only can you build applications faster as a result, but the applications have
similar structures. They are easier to maintain, and they seem more consistent
to their users. On the other hand, you lose some creative freedom, since many
design decisions have been made for you.

If applications are hard to design, and toolkits are harder, then frameworks are
hardest of all.
A framework designer gambles that one architecture will work for
all applications in the domain. Any substantive change to the framework's design
would reduce its benefits considerably, since the framework's main contribution
to an application is the architecture it defines. Therefore it's imperative to
design the framework to be as flexible and extensible as possible.

Furthermore, because applications are so dependent on the framework for their
design, they are particularly sensitive to changes in framework interfaces. As
a framework evolves, applications have to evolve with it. That makes loose coupling
all the more important; otherwise even a minor change to the framework will have
major repercussions.

Design pattern and frameworks:
1. Design patterns are more abstract than frameworks. Frameworks can be
embodied in code, but only examples of patterns can be embodied in code.
A strength of frameworks is that they can be written down in programming
languages and not only studied but executed and reused directly. In contrast,
the design patterns in this book have to be implemented each time they're
used. Design patterns also explain the intent, trade-offs, and consequences
of a design.
2. Design patterns are smaller architectural elements than frameworks. A
typical framework contains several design patterns, but the reverse is never
true.
3. Design patterns are less specialized than frameworks. Frameworks always
have a particular application domain. A graphical editor framework might
be used in a factory simulation, but it won't be mistaken for a simulation
framework. In contrast, the design patterns in this catalog can be used
in nearly any kind of application. While more specialized design patterns
than ours are certainly possible (say, design patterns for distributed
systems or concurrent programming), even these wouldn't dictate an
application architecture like a framework would.

Larger object-oriented
applications will end up consisting of layers of frameworks that cooperate with
each other. Most of the design and code in the application will come from or be
influenced by the frameworks it uses.

How to Select a Design Pattern?
How to Use a Design Pattern?
1. Read the pattern once through for an overview. Pay particular attention
to the Applicability and Consequences sections to ensure the pattern is
right for your problem.

2. Go back and study the Structure, Participants, and Collaborations sections.
Make sure you understand the classes and objects in the pattern and how
they relate to one another.

3. Look at the Sample Code section to see a concrete example of the pattern
in code. Studying the code helps you learn how to implement the pattern.

4. Choose names for pattern participants that are meaningful in the application
context. The names for participants in design patterns are usually too
abstract to appear directly in an application. Nevertheless, it's useful
to incorporate the participant name into the name that appears in the
application. That helps make the pattern more explicit in the implementation.
For example, if you use the Strategy pattern for a text compositing algorithm,
then you might have classes SimpleLayoutStrategy or TeXLayoutStrategy.

5. Define the classes. Declare their interfaces, establish their inheritance
relationships, and define the instance variables that represent data and
object references. Identify existing classes in your application that the
pattern will affect, and modify them accordingly.

6. Define application-specific names for operations in the pattern. Here again,
the names generally depend on the application. Use the responsibilities
and collaborations associated with each operation as a guide. Also, be
consistent in your naming conventions. For example, you might use the
"Create-" prefix consistently to denote a factory method.

7. Implement the operations to carry out the responsibilities and
collaborations in the pattern. The Implementation section offers hints to
guide you in the implementation. The examples in the Sample Code section
can help as well.
啥时候不用
No discussion of how to use design patterns would be complete without a few words
on how not to use them. Design patterns should not be applied indiscriminately.
Often they achieve flexibility and variability by introducing additional levels
of indirection, and that can complicate a design and/or cost you some performance.


Recursive Composition
A common way to represent hierarchically structured information isthrough a
technique called recursive composition, whichentails building increasingly
complex elements out of simpler ones.Recursive composition gives us a way to
compose a document out ofsimple graphical elements. As a first step, we can tile
a set ofcharacters and graphics from left to right to form a line in thedocument.
Then multiple lines can be arranged to form a column,multiple columns can form
a page, and so on.


By using an object for each character and graphical element in the document, we
promote flexibility at the finest levels of Lexi'sdesign. We can treat text and
graphics uniformly with respect to howthey are drawn, formatted, and embedded
within each other. We canextend Lexi to support new character sets without
disturbing otherfunctionality. Lexi's object structure mimics the
document's physical structure.
This approach has two important implications. The first is obvious:The objects
need corresponding classes. The second implication, which may be less obvious,
is that these classes must have compatible interfaces, because we want to treat
the objects uniformly. The way tomake interfaces compatible in a language like
C++ is to relate the classes through inheritance.

We'll define a Glyph abstract class for allobjects that can appear in a document
structure.3 Its subclasses define bothprimitive graphical elements (like
characters and images) andstructural elements (like rows and columns).

The Child operation returns the child (if any) at the givenindex. Glyphs like
Row that can have children should use Childinternally instead of accessing the
child data structure directly. That wayyou won't have to modify operations like
Draw that iteratethrough the children when you change the data structure from,
say, an arrayto a linked list.Similarly, Parent provides a standard interfaceto
the glyph's parent, if any. Glyphs in Lexi store a reference totheir parent, and
their Parent operation simply returns thisreference.

Recursive composition is good for more than just documents. We can useit to
represent any potentially complex, hierarchical structure. TheComposite (183)
pattern captures the essence ofrecursive composition in object-oriented terms.


Design a document editor:
7个问题
1.   Document structure.The choice of internal representation for the document 
affects nearlyevery aspect of Lexi's design. All editing, formatting, 
displaying,and textual analysis will require traversing the representation. 
Theway we organize this information will impact the design of the rest ofthe 
application. 
2.   Formatting.How does Lexi actually arrange text and graphics into lines 
andcolumns? What objects are responsible for carrying out 
differentformatting policies? How do these policies interact with 
thedocument's internal representation? 
3.   Embellishing the user interface.Lexi's user interface includes scroll bars, 
borders, and drop shadowsthat embellish the WYSIWYG document interface. 
Such embellishments arelikely to change as Lexi's user interface evolves. 
Hence it'simportant to be able to add and remove embellishments easily 
withoutaffecting the rest of the application. 
4.   Supporting multiple look-and-feel standards.Lexi should adapt easily to 
different look-and-feel standardssuch as Motif and Presentation Manager 
(PM) without major modification. 
5.   Supporting multiple window systems.Different look-and-feel standards are 
usually implemented on differentwindow systems. Lexi's design should be 
as independent of the windowsystem as possible. 
6.   User operations.Users control Lexi through various user interfaces, 
includingbuttons and pull-down menus. The functionality behind 
theseinterfaces is scattered throughout the objects in the application.The 
challenge here is to provide a uniform mechanism both foraccessing this 
scattered functionality and for undoing its effects. 
7.   Spelling checking and hyphenation.How does Lexi support analytical 
operations such as checking formisspelled words and determining 
hyphenation points? How can weminimize the number of classes we have to 
modify to add a newanalytical operation?

we'll choose an internal representation thatmatches the document's 
physical structure. 根据实际来实现


In addition to these goals are some constraints. First, we shouldtreat text and 
graphics uniformly. The application's interface letsthe user embed text within 
graphics freely and vice versa. We shouldavoid treating graphics as a special 
case of text or text as a specialcase of graphics; otherwise we'll end up with 
redundant formatting andmanipulation mechanisms. One set of mechanisms should 
suffice forboth text and graphics. 
通用性问题
Second, our implementation shouldn't have to distinguish between single elements 
and groups of elements in the internal representation.Lexi should be able to treat 
simple and complex elements uniformly, thereby allowing arbitrarily complex 
documents. The tenth element in line five of column two, for instance, could be 
a single character or an intricate diagram with many subelements. As long as we know 
this element can draw itself and specify its dimensions, its complexity has no 
bearing on how and where it should appear on the page. 

简单到复杂，类似react里面的web component
A common way to represent hierarchically structured information isthrough a 
technique called recursive composition, whichentails building increasingly 
complex elements out of simpler ones.
分层级结构，包括可见的实体和不可见的层级
We can represent this physical structure by devoting an object to eachimportant 
element. That includes not just the visible elements likethe characters and 
graphics but the invisible, structural elements aswell—the lines and the column. 
The result is the object structureshown in Figure 2.3. 
粒度
By using an object for each character and graphical element in thedocument, we 
promote flexibility at the finest levels of Lexi'sdesign.
We can treat text and 
graphics uniformly with respect to howthey are drawn, formatted, and embedded 
within each other. We canextend Lexi to support new character sets without 
disturbing otherfunctionality. Lexi's object structure mimics the 
document'sphysical structure.
可兼容的接口--> inheritage
This approach has two important implications. The first is obvious:The objects 
need corresponding classes. The second implication, whichmay be less obvious, 
is that these classes must have compatibleinterfaces, because we want to treat 
the objects uniformly. The way tomake interfaces compatible in a language like 
C++ is to relate theclasses through inheritance.
通用属性,抽象类,只能被inheriate不能被例化
We'll define a Glyph abstract class for allobjects that can appear in a document 
structure.
=======
/*design pattern notes:
1.introduction:
OO:需要考虑类的粒度,接口与继承关系,未来拓展,避免重新设计
要敢于使用面向对象
不要一开始就想新的方法去解决,学会复用,DRY
One thing expert designers know not to do is solve every problem from first 
principles. Rather, they reuse solutions that have worked for them in the past. 
basing new designs on prior experience.
object-oriented designers follow patterns like "represent states 
with objects" and "decorate objects so you can easily add/remove features." Once 
you know the pattern, a lot of design decisions follow automatically. 
If you could remember the details of the previous problem and how 
you solved it, then you could reuse the experience instead of rediscovering it.
how to represent algorithms as objects.
The design patterns in this book are descriptions of communicating objects and classes that are customized to solve 
a general design problem in a particular context. 
MVC consists of three kinds of objects. The Model is the application object, the 
View is its screen presentation, and the Controller defines the way the user 
interface reacts to user input. Before MVC, user interface designs tended to lump 
these objects together. MVC decouples them to increase flexibility and reuse. 
Model是不是可以看成数据object,而controller看成改变M(数据)的控制器,View则是Model的视图
MVC decouples views and models by establishing a subscribe/notify protocol between 
them. A view must ensure that its appearance reflects the state of the model. 
Whenever the model's data changes, the model notifies views that depend on it. 
In response, each view gets an opportunity to update itself. This approach lets 
you attach multiple views to a model to provide different presentations. You can 
also create new views for a model without rewriting it. 
这样看Model有点像redux的全局store.
Observer pattern:
多个views共一个model,解耦之后改变一个-->Model至其他views发生相应变化
MVC supports nested views with the CompositeView class, 
a subclass of View. CompositeView objects act just like View objects; a composite 
view can be used wherever a view can be used, but it also contains and manages 
nested views.

Composite (183) design pattern. It lets you create a class hierarchy in which 
some subclasses define primitive objects (e.g., Button) and other classes define 
composite objects (CompositeView) that assemble the primitives into more complex 
objects. 
组合优于继承
MVC also lets you change the way a view responds to user input without changing 
its visual presentation. You might want to change the way it responds to the keyboard, 
for example, or have it use a pop-up menu instead of command keys. MVC encapsulates 
the response mechanism in a Controller object. There is a class hierarchy of 
controll

 For example, 
a view can be disabled so that it doesn't accept input simply by giving it a 
controller that ignores input events.

MVC uses other design patterns, such as Factory Method (121) to specify the default 
controller class for a view and Decorator (196) to add scrolling to a view. But 
the main relationships in MVC are given by the Observer, Composite, and Strategy 
design patterns. 

first criterion of design pattern:
purpose:creational,structural or behavioral purpose
创建，组合，行为
 Creational patterns concern the process of 
object creation. Structural patterns deal with the composition of classes or 
objects. Behavioral patterns characterize the ways in which classes or objects 
interact and distribute responsibility. 

second criterion of design pattern:
scope: specify whether the pattern applies to classes or objects.
Class patterns deal with relationships between 
classes and their subclasses. These relationships are established through 
inheritance, so they are static—fixed at compile-time. Object patterns deal with 
object relationships, which can be changed at run-time and are more dynamic. Almost 
all patterns use inheritance to some extent. So the only patterns labeled "class 
patterns" are those that focus on class relationships. Note that most patterns 
are in the Object scope. 
类是静态，对象是动态

 Composite is often used with Iterator or Visitor.
 像是mixin?
 设计模式如何解决问题?
Requests are the only way to get an object to execute an operation. Operations 
are the only way to change an object's internal data. Because of these restrictions, 
the object's internal state is said to be encapsulated; it cannot be accessed 
directly, and its representation is invisible from outside the object. 
所以这样才有getter and setter吗?
The hard part about object-oriented design is decomposing a system into objects. 
The task is difficult because many factors come into play: encapsulation, 
granularity, dependency, flexibility, performance, evolution, reusability, and 
on and on. They all influence the decomposition, often in conflicting ways. 

Object-oriented design methodologies favor many different approaches. You can 
write a problem statement, single out the nouns and verbs, and create corresponding 
classes and operations. Or you can focus on the collaborations and responsibilities 
in your system. Or you can model the real world and translate the objects found 
during analysis into design. There will always be disagreement on which approach 
is best.
名词和动词是个好比喻
An object performs an operation when it receives a request 
(or message) from a client.比如说数据更新,调用方法等等
the Composite (183) pattern introduces an abstraction for treating objects 
uniformly that doesn't have a physical counterpart. Strict modeling of the real 
world leads to a system that reflects today's realities but not necessarily 
tomorrow's. The abstractions that emerge during design are key to making a design 
flexible. 
this does scale
 The Strategy 
(349) pattern describes how to implement interchangeable families of algorithms. 
The State (338) pattern represents each state of an entity as an object. These 
objects are seldom found during analysis or even the early stages of design; they're 
discovered later in the course of making a design more flexible and reusable. 

 The Facade (208) pattern describes 
how to represent complete subsystems as objects, and the Flyweight (218) pattern 
describes how to support huge numbers of objects at the finest granularities.

Type
A type is a name used to denote a particular interface. We speak of an object 
as having the type "Window" if it accepts all requests for the operations defined 
in the interface named "Window.

 Two objects of the same type need only 
share parts of their interfaces. Interfaces can contain other interfaces as subsets. 
We say that a type is a subtype of another if its interface contains the interface 
of its supertype. Often we speak of a subtype inheriting the interface of its 
supertype. 

Interfaces are fundamental in object-oriented systems. Objects are known only 
through their interfaces. There is no way to know anything about an object or 
to ask it to do anything without going through its interface. An object's interface 
says nothing about its implementation—different objects are free to implement 
requests differently.

 The run-time association of a request to an object 
and one of its operations is known as dynamic binding. 
表示是动态执行的,并不是在对象声明阶段,而是在调用阶段

Dynamic binding means that issuing a request doesn't commit you to a particular 
implementation until run-time. Consequently, you can write programs that expect 
an object with a particular interface, knowing that any object that has the correct 
interface will accept the request. Moreover, dynamic binding lets you substitute 
objects that have identical interfaces for each other at run-time. This 
substitutability is known as polymorphism, and it's a key concept in 
object-oriented systems.
It lets a client object make few assumptions about other 
objects beyond supporting a particular interface.
 Polymorphism simplifies the 
definitions of clients, decouples objects from each other, and lets them vary 
their relationships to each other at run-time.

Objects are created by instantiating a class. The object is said to be an instance 
of the class. The process of instantiating a class allocates storage for the 
object's internal data (made up of instance variables) and associates the 
operations with these data. Many similar instances of an object can be created 
by instantiating a class. 

An abstract class is one whose main purpose is to define a common interface for 
its subclasses. An abstract class will defer some or all of its implementation 
to operations defined in subclasses; hence an abstract class cannot be instantiated.

The operations that an abstract class declares but doesn't implement are called 
abstract operations. Classes that aren't abstract are called concrete classes.
类似一种保护机制吗?

A mixin class is a class that's intended to provide an optional interface or 
functionality to other classes.

It's important to understand the difference between an object's class and its 
type. 
An object's class defines how the object is implemented. The class defines the 
object's internal state and the implementation of its operations. In contrast, 
an object's type only refers to its interface—the set of requests to which it 
can respond. An object can have many types, and objects of different classes can 
have the same type. 

Of course, there's a close relationship between class and type. Because a class 
defines the operations an object can perform, it also defines the object's type. 
When we say that an object is an instance of a class, we imply that the object 
supports the interface defined by the class.


It's also important to understand the difference between class inheritance and 
interface inheritance (or subtyping). Class inheritance defines an object's 
implementation in terms of another object's implementation. In short, it's a 
mechanism for code and representation sharing. In contrast, interface inheritance 
(or subtyping) describes when an object can be used in place of another. 
接口继承是取代?

Programming to an Interface, not an Implementation
Class inheritance is basically just a mechanism for extending an application's 
functionality by reusing functionality in parent classes. It lets you define a 
new kind of object rapidly in terms of an old one.

However, implementation reuse is only half the story. Inheritance's ability to 
define families of objects with identical interfaces (usually by inheriting from 
an abstract class) is also important. Why? Because polymorphism depends on it. 
When inheritance is used carefully (some will say properly), all classes derived 
from an abstract class will share its interface. This implies that a subclass 
merely adds or overrides operations and does not hide operations of the parent 
class. All subclasses can then respond to the requests in the interface of this 
abstract class, making them all subtypes of the abstract class. 


信息隐藏
There are two benefits to manipulating objects solely in terms of the interface 
defined by abstract classes: 
1.   Clients remain unaware of the specific types of objects they use, as long 
as the objects adhere to the interface that clients expect. 
2.   Clients remain unaware of the classes that implement these objects. Clients 
only know about the abstract class(es) defining the interface. 

This so greatly reduces implementation dependencies between subsystems that it 
leads to the following principle of reusable object-oriented design: 
Program to an interface, not an implementation.  

Don't declare variables to be instances of particular concrete classes. Instead, 
commit only to an interface defined by an abstract class.
这句怎么理解?
Creational patterns ensure 
that your system is written in terms of interfaces, not implementations.

Putting Reuse Mechanisms to Work 
Inheritance versus Composition
The two most common techniques for reusing functionality in object-oriented 
systems are class inheritance and object composition. As we've explained, class 
inheritance lets you define the implementation of one class in terms of another's. 
Reuse by subclassing is often referred to as white-box reuse. The term "white-box" 
refers to visibility: With inheritance, the internals of parent classes are often 
visible to subclasses.
Object composition is an alternative to class inheritance. Here, new functionality 
is obtained by assembling or composing objects to get more complex functionality. 
Object composition requires that the objects being composed have well-defined 
interfaces. This style of reuse is called black-box reuse, because no internal 
details of objects are visible. Objects appear only as "black boxes."
Inheritance and composition each have their advantages and disadvantages. Class 
inheritance is defined statically at compile-time and is straightforward to use, 
since it's supported directly by the programming language. Class inheritance also 
makes it easier to modify the implementation being reused. When a subclass 
overrides some but not all operations, it can affect the operations it inherits 
as well, assuming they call the overridden operations. 
静态类vs动态composite?
But class inheritance has some disadvantages, too. First, you can't change the 
implementations inherited from parent classes at run-time, because inheritance 
is defined at compile-time. Second, and generally worse, parent classes often 
define at least part of their subclasses' physical representation. Because 
inheritance exposes a subclass to details of its parent's implementation, it's 
often said that "inheritance breaks encapsulation"
父类暴露了子类的presentation,这样就不能复用了?破坏了封装性
 The implementation 
of a subclass becomes so bound up with the implementation of its parent class 
that any change in the parent's implementation will force the subclass to change.
子类的detail与父类的implementation有关
这是没有解耦的意思?
Implementation dependencies can cause problems when you're trying to reuse a 
subclass. 
 Should any aspect of the inherited implementation not be appropriate 
for new problem domains, the parent class must be rewritten or replaced by something 
more appropriate.

 This dependency limits flexibility and ultimately reusability.
 One cure for this is to inherit only from abstract classes, since they usually 
provide little or no implementation.

Object composition is defined dynamically at run-time through objects acquiring 
references to other objects. Composition requires objects to respect each others' 
interfaces, which in turn requires carefully designed interfaces that don't stop 
you from using one object with many others. But there is a payoff. Because objects 
are accessed solely through their interfaces, we don't break encapsulation. Any 
object can be replaced at run-time by another as long as it has the same type.

Moreover, because an object's implementation will be written in terms of object 
interfaces, there are substantially fewer implementation dependencies.

Object composition has another effect on system design. Favoring object 
composition over class inheritance helps you keep each class encapsulated and 
focused on one task. Your classes and class hierarchies will remain small and 
will be less likely to grow into unmanageable monsters. On the other hand, a design 
based on object composition will have more objects (if fewer classes), and the 
system's behavior will depend on their interrelationships instead of being defined 
in one class.
Favor object composition over class inheritance.
Ideally, you shouldn't have to create new components to achieve reuse. You should 
be able to get all the functionality you need just by assembling existing components 
through object composition. But this is rarely the case, because the set of 
available components is never quite rich enough in practice. Reuse by inheritance 
makes it easier to make new components that can be composed with old ones. 
Inheritance and object composition thus work together. 
Nevertheless, our experience is that designers overuse inheritance as a reuse 
technique, and designs are often made more reusable (and simpler) by depending 
more on object composition. You'll see object composition applied again and again 
in the design patterns. 

Delegation:
Delegation is a way of making composition as powerful for reuse as inheritance 
In delegation, two objects are involved in handling a request:
a receiving object delegates operations to its delegate. This is analogous to 
subclasses deferring requests to parent classes.
有点类似父子类
 But with inheritance, an 
inherited operation can always refer to the receiving object through the this 
member variable in C++ and self in Smalltalk. To achieve the same effect with 
delegation, the receiver passes itself to the delegate to let the delegated 
operation refer to the receiver. 
For example, instead of making class Window a subclass of Rectangle (because 
windows happen to be rectangular), the Window class might reuse the behavior of 
Rectangle by keeping a Rectangle instance variable and delegating 
Rectangle-specific behavior to it. In other words, instead of a Window being a 
Rectangle, it would have a Rectangle. Window must now forward requests to its 
Rectangle instance explicitly, whereas before it would have inherited those 
operations. 
委托需要实例,这点在JS中用prototype太简单
 a class keeps a reference to an instance 
of another class.

The main advantage of delegation is that it makes it easy to compose behaviors 
at run-time and to change the way they're composed.
Our window can become circular 
at run-time simply by replacing its Rectangle instance with a Circle instance, 
assuming Rectangle and Circle have the same type.

Delegation has a disadvantage it shares with other techniques that make software 
more flexible through object composition: Dynamic, highly parameterized software 
is harder to understand than more static software. There are also run-time 
inefficiencies, but the human inefficiencies are more important in the long run. 
Delegation is a good design choice only when it simplifies more than it complicates. 
It isn't easy to give rules that tell you exactly when to use delegation, because 
how effective it will be depends on the context and on how much experience you have with it. Delegation works best when it's used in highly stylized ways—that 
is, in standard patterns. 

Delegation is an extreme example of object composition. It shows that you can 
always replace inheritance with object composition as a mechanism for code reuse.

Inheritance versus Parameterized Types
Another (not strictly object-oriented) technique for reusing functionality is 
through parameterized types, also known as generics (Ada, Eiffel) and templates 
(C++).

Parameterized types give us a third way (in addition to class inheritance and 
object composition) to compose behavior in object-oriented systems.
There are important differences between these techniques. Object composition lets 
you change the behavior being composed at run-time, but it also requires 
indirection and can be less efficient. Inheritance lets you provide default 
implementations for operations and lets subclasses override them. Parameterized 
types let you change the types that a class can use. But neither inheritance nor 
parameterized types can change at run-time. Which approach is best depends on 
your design and implementation constraints.

Relating Run-Time and Compile-Time Structures
An object-oriented program's run-time structure often bears little resemblance 
to its code structure. The code structure is frozen at compile-time; it consists 
of classes in fixed inheritance relationships. A program's run-time structure 
consists of rapidly changing networks of communicating objects. In fact, the two 
structures are largely independent. Trying to understand one from the other is 
like trying to understand the dynamism of living ecosystems from the static 
taxonomy of plants and animals, and vice versa. 

Consider the distinction between object aggregation and acquaintance and how 
differently they manifest themselves at compile- and run-times. Aggregation 
implies that one object owns or is responsible for another object. Generally we 
speak of an object having or being part of another object. Aggregation implies 
that an aggregate object and its owner have identical lifetimes.

Acquaintance implies that an object merely knows of another object. Sometimes 
acquaintance is called "association" or the "using" relationship. Acquainted 
objects may request operations of each other, but they aren't responsible for 
each other. Acquaintance is a weaker relationship than aggregation and suggests 
much looser coupling between objects. 
这两货实现起来一样
 In C++, aggregation can be implemented by defining member 
variables that are real instances, but it's more common to define them as pointers 
or references to instances. Acquaintance is implemented with pointers and 
references as well. 

Ultimately, acquaintance and aggregation are determined more by intent than by 
explicit language mechanisms. The distinction may be hard to see in the 
compile-time structure, but it's significant. Aggregation relationships tend to 
be fewer and more permanent than acquaintance. Acquaintances, in contrast, are 
made and remade more frequently, sometimes existing only for the duration of an 
operation. Acquaintances are more dynamic as well, making them more difficult 
to discern in the source code

Designing for Change 
The key to maximizing reuse lies in anticipating new requirements and changes 
to existing requirements, and in designing your systems so that they can evolve 
accordingly.

Here are some common causes of redesign along with the design pattern(s) that 
address them:  
1.   Creating an object by specifying a class explicitly. Specifying a class 
name when you create an object commits you to a particular implementation 
instead of a particular interface. This commitment can complicate future 
changes. To avoid it, create objects indirectly.  
Design patterns: Abstract Factory (99), Factory Method (121), Prototype 
(133). 

2.   Dependence on specific operations. When you specify a particular operation, 
you commit to one way of satisfying a request. By avoiding hard-coded 
requests, you make it easier to change the way a request gets satisfied 
both at compile-time and at run-time.  
Design patterns: Chain of Responsibility (251), Command (263).

3.   Dependence on hardware and software platform. External operating system 
interfaces and application programming interfaces (APIs) are different on 
different hardware and software platforms. Software that depends on a 
particular platform will be harder to port to other platforms. It may even 
be difficult to keep it up to date on its native platform. It's important 
therefore to design your system to limit its platform dependencies.  
Design patterns: Abstract Factory (99), Bridge (171).


4.   Dependence on object representations or implementations. Clients that know 
how an object is represented, stored, located, or implemented might need 
to be changed when the object changes. Hiding this information from clients 
keeps changes from cascading.  

5.   Algorithmic dependencies. Algorithms are often extended, optimized, and 
replaced during development and reuse. Objects that depend on an algorithm 
will have to change when the algorithm changes. Therefore algorithms that 
are likely to change should be isolated.  
Design patterns: Builder (110), Iterator (289), Strategy (349), Template 
Method (360), Visitor (366).

6.   Tight coupling. Classes that are tightly coupled are hard to reuse in 
isolation, since they depend on each other. Tight coupling leads to 
monolithic systems, where you can't change or remove a class without 
understanding and changing many other classes. The system becomes a dense 
mass that's hard to learn, port, and maintain.

Loose coupling increases the probability that a class can be reused by itself 
and that a system can be learned, ported, modified, and extended more easily. 
Design patterns use techniques such as abstract coupling and layering to 
promote loosely coupled systems.

Design patterns: Abstract Factory (99), Bridge (171), Chain of 
Responsibility (251), Command (263), Facade (208), Mediator (305), 
Observer (326).

7.   Extending functionality by subclassing. Customizing an object by 
subclassing often isn't easy. Every new class has a fixed implementation 
overhead (initialization, finalization, etc.). Defining a subclass also 
requires an in-depth understanding of the parent class. For example, 
overriding one operation might require overriding another. An overridden 
operation might be required to call an inherited operation. And subclassing 
can lead to an explosion of classes, because you might have to introduce 
many new subclasses for even a simple extension.  


Object composition in general and delegation in particular provide flexible 
alternatives to inheritance for combining behavior. New functionality can 
be added to an application by composing existing objects in new ways rather 
than by defining new subclasses of existing classes. On the other hand, 
heavy use of object composition can make designs harder to understand. Many 
design patterns produce designs in which you can introduce customized 
functionality just by defining one subclass and composing its instances 
with existing ones. 

Design patterns use techniques such as abstract coupling and layering to
promote loosely coupled systems.

8. Inability to alter classes conveniently. Sometimes you have to modify a
class that can't be modified conveniently. Perhaps you need the source code
and don't have it (as may be the case with a commercial class library).
Or maybe any change would require modifying lots of existing subclasses.
Design patterns offer ways to modify classes in such circumstances.
Design patterns: Adapter (157), Decorator (196), Visitor (366).

These examples reflect the flexibility that design patterns can help you build
into your software. How crucial such flexibility is depends on the kind of software
you're building. Let's look at the role design patterns play in the development
of three broad classes of software: application programs, toolkits, and
frameworks.
Application Programs
Design patterns that reduce dependencies can increase internal reuse. Looser coupling
boosts the likelihood that one class of object can cooperate with several others.
For example, when you eliminate dependencies on specific operations by isolating
and encapsulating each operation, you make it easier to reuse an operation in
different contexts. The same thing can happen when you remove algorithmic and
representational dependencies too.

Design patterns also make an application more maintainable when they're used to
limit platform dependencies and to layer a system.

Frameworks

A framework is a set of cooperating classes that make up a reusable design for
a specific class of software [Deu89, JF88]. For example, a framework can be geared
toward building graphical editors for different domains like artistic drawing,
music composition, and mechanical CAD [VL90, Joh92]. Another framework can help
you build compilers for different programming languages and target machines
[JML92]. Yet another might help you build financial modeling applications [BE93].
You customize a framework to a particular application by creating
application-specific subclasses of abstract classes from the framework.


The framework dictates the architecture of your application. It will define the
overall structure, its partitioning into classes and objects, the key
responsibilities thereof, how the classes and objects collaborate, and the thread
of control. A framework predefines these design parameters so that you, the
application designer/implementer, can concentrate on the specifics of your
application. The framework captures the design decisions that are common to its
application domain. Frameworks thus emphasize design reuse over code reuse, though
a framework will usually include concrete subclasses you can put to work
immediately.

Reuse on this level leads to an inversion of control between the application and
the software on which it's based. When you use a toolkit (or a conventional
subroutine library for that matter), you write the main body of the application
and call the code you want to reuse. When you use a framework, you reuse the main
body and write the code it calls. You'll have to write operations with particular
names and calling conventions, but that reduces the design decisions you have
to make.
框架类似帮你搭好架子,写api函数的调用代码,不自由,但是更利于维护
Not only can you build applications faster as a result, but the applications have
similar structures. They are easier to maintain, and they seem more consistent
to their users. On the other hand, you lose some creative freedom, since many
design decisions have been made for you.

If applications are hard to design, and toolkits are harder, then frameworks are
hardest of all.
A framework designer gambles that one architecture will work for
all applications in the domain. Any substantive change to the framework's design
would reduce its benefits considerably, since the framework's main contribution
to an application is the architecture it defines. Therefore it's imperative to
design the framework to be as flexible and extensible as possible.

Furthermore, because applications are so dependent on the framework for their
design, they are particularly sensitive to changes in framework interfaces. As
a framework evolves, applications have to evolve with it. That makes loose coupling
all the more important; otherwise even a minor change to the framework will have
major repercussions.

Design pattern and frameworks:
1. Design patterns are more abstract than frameworks. Frameworks can be
embodied in code, but only examples of patterns can be embodied in code.
A strength of frameworks is that they can be written down in programming
languages and not only studied but executed and reused directly. In contrast,
the design patterns in this book have to be implemented each time they're
used. Design patterns also explain the intent, trade-offs, and consequences
of a design.
2. Design patterns are smaller architectural elements than frameworks. A
typical framework contains several design patterns, but the reverse is never
true.
3. Design patterns are less specialized than frameworks. Frameworks always
have a particular application domain. A graphical editor framework might
be used in a factory simulation, but it won't be mistaken for a simulation
framework. In contrast, the design patterns in this catalog can be used
in nearly any kind of application. While more specialized design patterns
than ours are certainly possible (say, design patterns for distributed
systems or concurrent programming), even these wouldn't dictate an
application architecture like a framework would.

Larger object-oriented
applications will end up consisting of layers of frameworks that cooperate with
each other. Most of the design and code in the application will come from or be
influenced by the frameworks it uses.

How to Select a Design Pattern?
How to Use a Design Pattern?
1. Read the pattern once through for an overview. Pay particular attention
to the Applicability and Consequences sections to ensure the pattern is
right for your problem.

2. Go back and study the Structure, Participants, and Collaborations sections.
Make sure you understand the classes and objects in the pattern and how
they relate to one another.

3. Look at the Sample Code section to see a concrete example of the pattern
in code. Studying the code helps you learn how to implement the pattern.

4. Choose names for pattern participants that are meaningful in the application
context. The names for participants in design patterns are usually too
abstract to appear directly in an application. Nevertheless, it's useful
to incorporate the participant name into the name that appears in the
application. That helps make the pattern more explicit in the implementation.
For example, if you use the Strategy pattern for a text compositing algorithm,
then you might have classes SimpleLayoutStrategy or TeXLayoutStrategy.

5. Define the classes. Declare their interfaces, establish their inheritance
relationships, and define the instance variables that represent data and
object references. Identify existing classes in your application that the
pattern will affect, and modify them accordingly.

6. Define application-specific names for operations in the pattern. Here again,
the names generally depend on the application. Use the responsibilities
and collaborations associated with each operation as a guide. Also, be
consistent in your naming conventions. For example, you might use the
"Create-" prefix consistently to denote a factory method.

7. Implement the operations to carry out the responsibilities and
collaborations in the pattern. The Implementation section offers hints to
guide you in the implementation. The examples in the Sample Code section
can help as well.
啥时候不用
No discussion of how to use design patterns would be complete without a few words
on how not to use them. Design patterns should not be applied indiscriminately.
Often they achieve flexibility and variability by introducing additional levels
of indirection, and that can complicate a design and/or cost you some performance.


Recursive Composition
A common way to represent hierarchically structured information isthrough a
technique called recursive composition, whichentails building increasingly
complex elements out of simpler ones.Recursive composition gives us a way to
compose a document out ofsimple graphical elements. As a first step, we can tile
a set ofcharacters and graphics from left to right to form a line in thedocument.
Then multiple lines can be arranged to form a column,multiple columns can form
a page, and so on.


By using an object for each character and graphical element in the document, we
promote flexibility at the finest levels of Lexi'sdesign. We can treat text and
graphics uniformly with respect to howthey are drawn, formatted, and embedded
within each other. We canextend Lexi to support new character sets without
disturbing otherfunctionality. Lexi's object structure mimics the
document's physical structure.
This approach has two important implications. The first is obvious:The objects
need corresponding classes. The second implication, which may be less obvious,
is that these classes must have compatible interfaces, because we want to treat
the objects uniformly. The way tomake interfaces compatible in a language like
C++ is to relate the classes through inheritance.

We'll define a Glyph abstract class for allobjects that can appear in a document
structure.3 Its subclasses define bothprimitive graphical elements (like
characters and images) andstructural elements (like rows and columns).

The Child operation returns the child (if any) at the givenindex. Glyphs like
Row that can have children should use Childinternally instead of accessing the
child data structure directly. That wayyou won't have to modify operations like
Draw that iteratethrough the children when you change the data structure from,
say, an arrayto a linked list.Similarly, Parent provides a standard interfaceto
the glyph's parent, if any. Glyphs in Lexi store a reference totheir parent, and
their Parent operation simply returns thisreference.

Recursive composition is good for more than just documents. We can useit to
represent any potentially complex, hierarchical structure. TheComposite (183)
pattern captures the essence ofrecursive composition in object-oriented terms.


As long as weknow
this element can draw itself and specify its dimensions, itscomplexity has no
bearing on how and where it should appear on thepage.
devoting an object to eachimportant element.
*/
//abstract class Glyph,
//appearance
virtual void Draw(Window*)
virtual void Bounds(Rect&)
//hit detection
virtual bool Intersects(const Point&)
//structure
virtual void Insert(Glyph*, int)
virtual void Remove(Glyph*)
virtual Glyph* Child(int)
virtual Glyph* Parent()
/*Glyphs have three basic responsibilities. They know 
(1) how to draw themselves,
(2) what space they occupy, and 
(3) their children and parent.

接口
Glyphs like
Row that can have children should use Childinternally instead of accessing the
child data structure directly. That wayyou won't have to modify operations like
Draw that iteratethrough the children when you change the data structure from,
say, an arrayto a linked list. Similarly, Parent provides a standard interfaceto
the glyph's parent, if any. Glyphs in Lexi store a reference totheir parent, and
their Parent operation simply returns thisreference.

the trade-off
Wewant generally good response from the
editor without sacrificing how goodthe document looks. This trade-off is subject
to many factors, not all ofwhich can be ascertained at compile-time. For example,
the user mighttolerate slightly slower response in exchange for better formatting.
Thattrade-off might make an entirely different formatting algorithm
moreappropriate than the current one. Another, more
implementation-driventrade-off balances formatting speed and storage
requirements: It may bepossible to decrease formatting time by caching more
information.

More specifically, we'll define a separate class
hierarchy for objectsthat encapsulate formatting algorithms. The root of the
hierarchy willdefine an interface that supports a wide range of
formattingalgorithms, and each subclass will implement the interface to carryout
a particular algorithm. Then we can introduce a Glyph subclassthat will structure
its children automatically using a given algorithmobject.

The Compositor-Composition class split ensures a strong separationbetween code
that supports the document's physical structure and thecode for different
formatting algorithms. We can add new Compositorsubclasses without touching the
glyph classes, and vice versa. Infact, we can change the linebreaking algorithm
at run-time by adding asingle SetCompositor operation to Composition's basic
glyphinterface.

要传入context吗?
Encapsulating an algorithm in an object is the intent of the Strategy (349) pattern.
The key participants in thepattern are Strategy objects (which encapsulate
different algorithms)and the context in which they operate.

Encapsulating an algorithm in an object is the intent of the Strategy (349) pattern.
The key participants in thepattern are Strategy objects (which encapsulate
different algorithms)and the context in which they operate. Compositors are strategies;they encapsulate different formatting algorithms. A composition is
thecontext for a compositor strategy.

The key to applying the Strategy pattern is designing interfaces forthe strategy
and its context that are general enough to support arange of algorithms. You
shouldn't have to change the strategy orcontext interface to support a new
algorithm. In our example, thebasic Glyph interface's support for child access,
insertion, andremoval is general enough to let Compositor subclasses change
thedocument's physical structure, regardless of the algorithm they use todo it.
Likewise, the Compositor interface gives compositions whateverthey need to
initiate formatting.
解耦
To make it easy to add
and remove theseembellishments (especially at run-time), we shouldn't use
inheritanceto add them to the user interface. We achieve the most flexibilityif
other user interface objects don't even know the embellishments arethere. That
will let us add and remove the embellishments withoutchanging other classes.

We could add a border to Composition by subclassing it to yield
aBorderedComposition class. Or we could add a scrolling interface inthe same way
to yield a ScrollableComposition. If we want both scrollbars and a border, we
might produce a BorderedScrollableComposition,and so forth. In the extreme, we
end up with a class for everypossible combination of embellishments, a solution
that quicklybecomes unworkable as the variety of embellishments grows.

Our firstchoice, composing the glyph in the border, keeps the
border-drawingcode entirely in the Border class, leaving other classes alone.

像react
All this leads us to the concept of transparent enclosure,which combines the
notions of (1) single-child (orsingle-component) composition and (2)
compatibleinterfaces. Clients generally can't tell whether they're dealing
withthe component or its enclosure (i.e., the child's parent),especially if the
enclosure simply delegates all its operations to itscomponent. But the enclosure
can also augment the component'sbehavior by doing work of its own before and/or
after delegating anoperation. The enclosure can also effectively add state to
thecomponent. We'll see how next.

We can apply the concept of transparent enclosure to all glyphs thatembellish
other glyphs. To make this concept concrete, we'll define asubclass of Glyph called
MonoGlyph to serve as an abstractclass for "embellishment glyphs," likeBorder
(see Figure 2.7).MonoGlyph stores a reference to a component and forwards all
requests toit. That makes MonoGlyph totally transparent to clients by default.For
example, MonoGlyph implements the Draw operation like this:
void MonoGlyph::Draw (Window* w) {
	_component->Draw(w);
}

MonoGlyph subclasses reimplement at least one of these forwardingoperations.
Border::Draw, for instance, first invokes the parentclass operation
MonoGlyph::Draw on the component to let thecomponent do its part—that is, draw
everything but the border. ThenBorder::Draw draws the border by calling a
privateoperation called DrawBorder, the details of which we'llomit:
void Border::Draw (Window* w) {
MonoGlyph::Draw(w);
DrawBorder(w);
}

Notice how Border::Draw effectively extends the parentclass operation to draw
the border. This is in contrast to merelyreplacing the parent class operation,
which would omit the call toMonoGlyph::Draw.

The point is, transparent enclosure
makes it easy toexperiment with different alternatives, and it keeps clients free
ofembellishment code.

