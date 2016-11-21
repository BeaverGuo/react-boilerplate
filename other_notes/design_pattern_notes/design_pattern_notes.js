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
makes it easy to experiment with different alternatives, and it keeps clients free
of embellishment code.

Keeping embellishmentindependent of other
kinds of composition both simplifies theembellishment classes and reduces their
number. It also keeps us fromreplicating existing composition functionality.

In the Decorator pattern,
embellishment refersto anything that adds responsibilities to an object. We can
thinkfor example of embellishing an abstract syntax tree with semanticactions,
a finite state automaton with new transitions, or a networkof persistent objects
with attribute tags. Decorator generalizes theapproach we've used in Lexi to make
it more widely applicable.

Achieving portability across hardware and software platforms is amajor problem
in system design.

Lexi needs a way to determine the look-and-feel standard that's beingtargeted
in order to create the appropriate widgets. Not only must weavoid making explicit
constructor calls; we must also be able toreplace an entire widget set easily.
We can achieve both by abstracting the process of object creation. An example
willillustrate what we mean.

减少look-and-feel依赖
ScrollBar* sb = new MotifScrollBar;
-->
ScrollBar* sb = guiFactory->CreateScrollBar();
The guiFactory object abstracts the process of creatingnot just Motif scroll bars but scroll
bars for anylook-and-feel standard. And guiFactory isn't limitedto producing
scroll bars. It can manufacture a full range of widgetglyphs, including scroll
bars, buttons, entry fields, menus, andso forth.

Thevariable guiFactory could
be a global, a static member of awell-known class, or even a local variable if
the entire user interface iscreated within one class or function. There's even
a design pattern,Singleton (144), for managing well-known, one-of-a-kindobjects
like this. The important thing, though, is to initializeguiFactory at a point
in the program before it's ever usedto create widgets but after it's clear which
look and feel isdesired.

If the look and feel is known at compile-time, then guiFactorycan be initialized
with a simple assignment of a new factory instanceat the beginning of the program:
GUIFactory* guiFactory = new MotifFactory;



GUIFactory* guiFactory;
const char* styleName = getenv("LOOK_AND_FEEL");
// user or environment supplies this at startup
if (strcmp(styleName, "Motif") == 0) {
guiFactory = new MotifFactory;
} else if (strcmp(styleName, "Presentation_Manager") == 0) {
guiFactory = new PMFactory;
} else {
guiFactory = new DefaultGUIFactory;
}

Window is an abstract class. Concrete subclasses of Window support thedifferent
kinds of windows that users deal with. For example,application windows, icons,
and warning dialogs are all windows, butthey have somewhat different behaviors.
So we can define subclasseslike ApplicationWindow, IconWindow, and DialogWindow
to capture thesedifferences.

but what else can we do? Thesame thing
we did for formatting and embellishment, namely, encapsulate the concept that
varies. What varies in this case is thewindow system implementation. If we
encapsulate a window system'sfunctionality in an object, then we can implement
our Window class andsubclasses in terms of that object's interface. Moreover,
if thatinterface can serve all the window systems we're interested in, thenwe
won't have to change Window or any of its subclasses to supportdifferent window
systems. We can configure window objects to thewindow system we want simply by
passing them the right windowsystem-encapsulating object. We can even configure
the window atrun-time.

We'll define a separate WindowImp class hierarchy in which tohide different window
system implementations. WindowImp is an abstractclass for objects that encapsulate
window system-dependent code. To makeLexi work on a particular window system,
we configure each windowobject with an instance of a WindowImp subclass for that
system.
By hiding the implementations in WindowImp classes, we avoid pollutingthe Window
classes with window system dependencies, which keeps theWindow class hierarchy
comparatively small and stable. Meanwhile wecan easily extend the implementation
hierarchy to support new windowsystems.

void Window::DrawRect ( Coord x0, Coord y0, Coord x1, Coord y1 )
{ _imp->DeviceRect(x0, y0, x1, y1); }
where _imp is a member variable of Window that stores theWindowImp with which
the Window is configured.

void PMWindowImp::DeviceRect ( Coord x0, Coord y0, Coord x1, Coord y1 )
{
Coord left = min(x0, x1);
Coord right = max(x0, x1);
Coord bottom = min(y0, y1);
Coord top = max(y0, y1);
PPOINTL point[4];
point[0].x = left; point[0].y = top;
point[1].x = right;point[1].y = top;
point[2].x = right;point[2].y = bottom;
point[3].x = left; point[3].y = bottom;
if ( (GpiBeginPath(_hps, 1L) == false) ||
(GpiSetCurrentPosition(_hps, &point[3]) == false) ||
(GpiPolyLine(_hps, 4L, point) == GPI_ERROR) ||
(GpiEndPath(_hps) == false) )
{// report error
} else {
GpiStrokePath(_hps, 1L, 0L);
}
}

PM's implementation of DeviceRect is obviously quitedifferent from X's, but that
doesn't matter. WindowImp hidesvariations in window system interfaces behind a
potentially large butstable interface. That lets Window subclass writers focus
on the windowabstraction and not on window system details. It also lets us
addsupport for new window systems without disturbing the Window classes.

The intent behind Bridge is to allowseparate class hierarchies to work
together even as they evolveindependently.

Furthermore, these operations are implemented in many differentclasses. We as
implementors want to access their functionalitywithout creating a lot of
dependencies between implementation and userinterface classes. Otherwise we'll
end up with a tightly coupledimplementation, which will be harder to understand,
extend, andmaintain.

What's missing is a mechanism that lets us parameterize menu items bythe request
they should fulfill. That way we avoid a proliferation ofsubclasses and allow
for greater flexibility at run-time. We couldparameterize MenuItem with a function
to call, but that's not a completesolution for at least three reasons:
1. It doesn't address the undo/redo problem.
2. It's hard to associate state with a function. For example, afunction that
changes the font needs to know which font.
3. Functions are hard to extend, and it's hard to reuse parts of them.

These reasons suggest that we should parameterize MenuItems with anobject, not
a function. Then we can use inheritance to extendand reuse the request's
implementation. We also have a place to storestate and implement undo/redo
functionality. Here we have anotherexample of encapsulating the concept that
varies, in this case arequest. We'll encapsulate each request in a commandobject.

Undo/redo is an important capability in interactive applications. Toundo and redo
commands, we add an Unexecute operation to Command'sinterface.

Of course, if the subsequent operation is not another redo but an undo,then the
command to the left of the present line will be undone.

Lexi's commands are an application of the Command (263) pattern, which describes
how toencapsulate a request. The Command pattern prescribes a uniforminterface
for issuing requests that lets you configure clients tohandle different requests.
The interface shields clients from therequest's implementation. A command may
delegate all, part, or noneof the request's implementation to other objects. This
is perfect forapplications like Lexi that must provide centralized access
tofunctionality scattered throughout the application. The pattern alsodiscusses
undo and redo mechanisms built on the basic Commandinterface.

A diverse set of algorithmscan provide a choice of
space/time/quality trade-offs.

There are actually two pieces to this puzzle: (1) accessing theinformation to
be analyzed, which we have scattered over the glyphsin the document structure,
and (2) doing the analysis. We'll look atthese two pieces separately.


Many kinds of analysis require examining the text character bycharacter. The text
we need to analyze is scattered throughout ahierarchical structure of glyph objects.
To examine text in such astructure, we need an access mechanism that has knowledge
about thedata structures in which objects are stored. Some glyphs might storetheir
children in linked lists, others might use arrays, and stillothers might use more
esoteric data structures. Our access mechanismmust be able to handle all of these
possibilities.


So our access mechanism must accommodate differing data structures, andwe must
support different kinds of traversals, such as preorder,postorder, and inorder.


Encapsulating Access and Traversal

An important
role of the glyphabstraction is to hide the data structure in which children
arestored. That way we can change the data structure a glyph class useswithout
affecting other classes.


Acorollary is that
the glyph interface shouldn't be biased toward onedata structure or another.

void First(Traversal kind)
void Next()
bool IsDone()
Glyph* GetCurrent()
void Insert(Glyph*)

Glyph* g;
for (g->First(PREORDER); !g->IsDone(); g->Next()) {
Glyph* current = g->GetCurrent();
// do some analysis
}
Notice that we've banished the integer index from the glyph interface.There's
no longer anything that biases the interface toward one kindof collection or
another. We've also saved clients from having toimplement common kinds of
traversals themselves.

But this approach still has problems. For one thing, it can't supportnew traversals
without either extending the set of enumerated valuesor adding new operations.
Say we wanted to have a variation on preordertraversal that automatically skips


non-textual glyphs. We'd have tochange the Traversal enumeration to include
something likeTEXTUAL_PREORDER.
We'd like to avoid changing existing declarations.Putting the traversal mechanism
entirely in the Glyph class hierarchymakes it hard to modify or extend without
changing lots of classes.It's also difficult to reuse the mechanism to traverse
other kinds ofobject structures. And we can't have more than one traversal
inprogress on a structure.
Once again, a better solution is to encapsulate the concept thatvaries, in this
case the access and traversal mechanisms. We canintroduce a class of objects called
iterators whose solepurpose is to define different sets of these mechanisms. We
can useinheritance to let us access different data structures uniformly andsupport
new kinds of traversals as well. And we won't have to changeglyph interfaces or
disturb existing glyph implementations to do it.

We'll use an abstract class called Iterator todefine a general interface for access
and traversal.

Each Iterator subclass has areference to the structure
it traverses. Subclass instances areinitialized with this reference when they
are created.

Now we can access the children of a glyph structure without knowingits
representation:
Glyph* g;
Iterator<Glyph*>* i = g->CreateIterator();
for (i->First(); !i->IsDone(); i->Next()) {
Glyph* child = i->CurrentItem();
// do something with current child
}

CreateIterator returns a NullIterator instance by default. ANullIterator is a
degenerate iterator for glyphs that have nochildren, that is, leaf glyphs.
NullIterator's IsDone operationalways returns true.
A glyph subclass that has children will override CreateIterator toreturn an
instance of a different Iterator subclass. Whichsubclass depends on the structure
that stores the children. If theRow subclass of Glyph stores its children in a
list_children, then its CreateIterator operation would looklike this:
Iterator<Glyph*>* Row::CreateIterator () {
return new ListIterator<Glyph*>(_children);
}
Iterators for preorder and inorder traversals implement theirtraversals in terms
of glyph-specific iterators. The iterators forthese traversals are supplied the
root glyph in the structure theytraverse. They call CreateIterator on the glyphs
in the structure anduse a stack to keep track of the resulting iterators.


For example, class PreorderIterator gets the iterator fromthe root glyph,
initializes it to point to its first element, and thenpushes it onto the stack:
void PreorderIterator::First () {
Iterator<Glyph*>* i = _root->CreateIterator();
if (i) {
i->First();
_iterators.RemoveAll();
_iterators.Push(i);
}
}

void PreorderIterator::Next () {
Iterator<Glyph*>* i = _iterators.Top()->CurrentItem()->CreateIterator();
i->First();
_iterators.Push(i);
while ( _iterators.Size() > 0 && _iterators.Top()->IsDone() ) {
delete _iterators.Pop();
_iterators.Top()->Next();
}
}

Traversal versus Traversal Actions
First we have to decide where to put the responsibility for analysis. We could put it in the Iterator classes, thereby making analysis an integral part of traversal. But we get more flexibility and potential for reuse if we distinguish between the traversal and the actions performed during traversal. That's because different analyses often require the same kind of traversal. Hence we can reuse the same set of iterators for different analyses. For example, preorder traversal is common to many analyses, including spelling checking, hyphenation, forward search, and word count.

So analysis and traversal should be separate.
Where else can we put the responsibility for analysis? We know there are many kinds of analyses we might want to do. Each analysis will do different things at different points in the traversal. Some glyphs are more significant than others depending on the kind of analysis. If we're checking spelling or hyphenating, we want to consider character glyphs and not graphical ones like lines and bitmapped images. If we're making color separations, we'd want to consider visible glyphs and not invisible ones. Inevitably, different analyses will analyze different glyphs.

Therefore a given analysis must be able to distinguish different kinds of glyphs. An obvious approach is to put the analytical capability into the glyph classes themselves. For each analysis we can add one or more abstract operations to the Glyph class and have subclasses implement them in accordance with the role they play in the analysis.

But the trouble with that approach is that we'll have to change every glyph class whenever we add a new kind of analysis. We can ease this problem in some cases: If only a few classes participate in the analysis, or if most classes do the analysis the same way, then we can supply a default implementation for the abstract operation in the Glyph class. The default operation would cover the common case. Thus we'd limit changes to just the Glyph class and those subclasses that deviate from the norm.

Yet even if a default implementation reduces the number of changes, an insidious problem remains: Glyph's interface expands with every new analytical capability. Over time the analytical operations will start to obscure the basic Glyph interface. It becomes hard to see that a glyph's main purpose is to define and structure objects that have appearance and shape—that interface gets lost in the noise.

Encapsulating the Analysis
From all indications, we need to encapsulate the analysis in a separate object, much like we've done many times before. We could put the machinery for a given analysis into its own class. We could use an instance of this class in conjunction with an appropriate iterator. The iterator would "carry" the instance to each glyph in the structure. The analysis object could then perform a piece of the analysis at each point in the traversal. The analyzer accumulates information of interest (characters in this case) as the traversal proceeds:


The fundamental question with this approach is how the analysis object distinguishes different kinds of glyphs without resorting to type tests or downcasts. We don't want a SpellingChecker class to include (pseudo)code like

void SpellingChecker::Check (Glyph* glyph) {
    Character* c;
    Row* r;
    Image* i;

    if (c = dynamic_cast<Character*>(glyph)) {
        // analyze the character

    } else if (r = dynamic_cast<Row*>(glyph)) {
        // prepare to analyze r's children

    } else if (i = dynamic_cast<Image*>(glyph)) {
        // do nothing
    }
}

This code is pretty ugly. It relies on fairly esoteric capabilities like type-safe casts. It's hard to extend as well. We'll have to remember to change the body of this function whenever we change the Glyph class hierarchy. In fact, this is the kind of code that object-oriented languages were intended to eliminate.
We want to avoid such a brute-force approach, but how? Let's consider what happens when we add the following abstract operation to the Glyph class:

void CheckMe(SpellingChecker&)

We define CheckMe in every Glyph subclass as follows:

void GlyphSubclass::CheckMe (SpellingChecker& checker) {
    checker.CheckGlyphSubclass(this);
}

where GlyphSubclass would be replaced by the name of the glyph subclass. Note that when CheckMe is called, the specific Glyph subclass is known—after all, we're in one of its operations. In turn, the SpellingChecker class interface includes an operation like CheckGlyphSubclass for every Glyph subclass10:

class SpellingChecker {
public:
    SpellingChecker();

    virtual void CheckCharacter(Character*);
    virtual void CheckRow(Row*);
    virtual void CheckImage(Image*);

    // ... and so forth

    List<char*>& GetMisspellings();

protected:
    virtual bool IsMisspelled(const char*);

private:
    char _currentWord[MAX_WORD_SIZE];
    List<char*> _misspellings;
};

SpellingChecker's checking operation for Character glyphs might look something like this:

void SpellingChecker::CheckCharacter (Character* c) {
    const char ch = c->GetCharCode();

    if (isalpha(ch)) {
        // append alphabetic character to _currentWord

    } else {
        // we hit a nonalphabetic character

        if (IsMisspelled(_currentWord)) {
            // add _currentWord to _misspellings
            _misspellings.Append(strdup(_currentWord));
        }

        _currentWord[0] = '\0';
            // reset _currentWord to check next word
    }
}

Notice we've defined a special GetCharCode operation on just the Character class. The spelling checker can deal with subclass-specific operations without resorting to type tests or casts—it lets us treat objects specially.
CheckCharacter accumulates alphabetic characters into the _currentWord buffer. When it encounters a nonalphabetic character, such as an underscore, it uses the IsMisspelled operation to check the spelling of the word in _currentWord.11 If the word is misspelled, then CheckCharacter adds the word to the list of misspelled words. Then it must clear out the _currentWord buffer to ready it for the next word. When the traversal is over, you can retrieve the list of misspelled words with the GetMisspellings operation.
Now we can traverse the glyph structure, calling CheckMe on each glyph with the spelling checker as an argument. This effectively identifies each glyph to the SpellingChecker and prompts the checker to do the next increment in the spelling check.

SpellingChecker spellingChecker;
Composition* c;

// ...

Glyph* g;
PreorderIterator i(c);

for (i.First(); !i.IsDone(); i.Next()) {
    g = i.CurrentItem();
    g->CheckMe(spellingChecker);
}

This approach works for finding spelling errors, but how does it help us support multiple kinds of analysis? It looks like we have to add an operation like CheckMe(SpellingChecker&) to Glyph and its subclasses whenever we add a new kind of analysis. That's true if we insist on an independent class for every analysis. But there's no reason why we can't give all analysis classes the same interface. Doing so lets us use them polymorphically. That means we can replace analysis-specific operations like CheckMe(SpellingChecker&) with an analysis-independent operation that takes a more general parameter.


Visitor Class and Subclasses
We'll use the term visitor to refer generally to classes of objects that "visit" other objects during a traversal and do something appropriate.12 In this case we can define a Visitor class that defines an abstract interface for visiting glyphs in a structure.

class Visitor {
public:
    virtual void VisitCharacter(Character*) { }
    virtual void VisitRow(Row*) { }
    virtual void VisitImage(Image*) { }

    // ... and so forth
};
Concrete subclasses of Visitor perform different analyses. For example, we could have a SpellingCheckingVisitor subclass for checking spelling, and a HyphenationVisitor subclass for hyphenation. SpellingCheckingVisitor would be implemented exactly as we implemented SpellingChecker above, except the operation names would reflect the more general Visitor interface. For example, CheckCharacter would be called VisitCharacter.

Since CheckMe isn't appropriate for visitors that don't check anything, we'll give it a more general name:

Accept. Its argument must also change to take a Visitor&, reflecting the fact that it can accept any visitor. Now adding a new analysis requires just defining a new subclass of Visitor—we don't have to touch any of the glyph classes. We support all future analyses by adding this one operation to Glyph and its subclasses.

We've already seen how spelling checking works. We use a similar approach in HyphenationVisitor to accumulate text. But once HyphenationVisitor's VisitCharacter operation has assembled an entire word, it works a little differently. Instead of checking the word for misspelling, it applies a hyphenation algorithm to determine the potential hyphenation points in the word, if any. Then at each hyphenation point, it inserts a discretionary glyph into the composition. Discretionary glyphs are instances of Discretionary, a subclass of Glyph.

A discretionary glyph has one of two possible appearances depending on whether or not it is the last character on a line. If it's the last character, then the discretionary looks like a hyphen; if it's not at the end of a line, then the discretionary has no appearance whatsoever. The discretionary checks its parent (a Row object) to see if it is the last child. The discretionary makes this check whenever it's called on to draw itself or calculate its boundaries. The formatting strategy treats discretionaries the same as whitespace, making them candidates for ending a line. The following diagram shows how an embedded discretionary can appear.

Visitor Pattern
What we've described here is an application of the Visitor pattern. The Visitor class and its subclasses described earlier are the key participants in the pattern. The Visitor pattern captures the technique we've used to allow an open-ended number of analyses of glyph structures without having to change the glyph classes themselves. Another nice feature of visitors is that they can be applied not just to composites like our glyph structures but to any object structure. That includes sets, lists, even directed-acyclic graphs. Furthermore, the classes that a visitor can visit needn't be related to each other through a common parent class. That means visitors can work across class hierarchies.

An important question to ask yourself before applying the Visitor pattern is, Which class hierarchies change most often? The pattern is most suitable when you want to be able to do a variety of different things to objects that have a stable class structure. Adding a new kind of visitor requires no change to that class structure, which is especially important when the class structure is large. But whenever you add a subclass to the structure, you'll also have to update all your visitor interfaces to include a Visit... operation for that subclass. In our example that means adding a new Glyph subclass called Foo will require changing Visitor and all its subclasses to include a VisitFoo operation. But given our design constraints, we're much more likely to add a new kind of analysis to Lexi than a new kind of Glyph. So the Visitor pattern is well-suited to our needs.

We've applied eight different patterns to Lexi's design:

Composite to represent the document's physical structure, 
Strategy to allow different formatting algorithms, 
Decorator for embellishing the user interface, 
Abstract Factory for supporting multiple look-and-feel standards, 
Bridge to allow multiple windowing platforms, 
Command for undoable user operations, 
Iterator for accessing and traversing object structures, and 
Visitor for allowing an open-ended number of analytical capabilities without complicating the document structure's implementation.

Creational Patterns
Creational design patterns abstract the instantiation process. 
A class creational pattern uses inheritance to vary the class that's instantiated, whereas an object creational pattern will delegate instantiation to another object. 

Creational patterns become important as systems evolve to depend more on object composition than class inheritance. As that happens, emphasis shifts away from hard-coding a fixed set of behaviors toward defining a smaller set of fundamental behaviors that can be composed into any number of more complex ones. Thus creating objects with particular behaviors requires more than simply instantiating a class. 

 First, they all encapsulate knowledge about which concrete classes the system uses. Second, they hide how instances of these classes are created and put together. All the system at large knows about the objects is their interfaces as defined by abstract classes. Consequently, the creational patterns give you a lot of flexibility in what gets created, who creates it, how it gets created, and when. They let you configure a system with "product" objects that vary widely in structure and functionality. Configuration can be static (that is, specified at compile-time) or dynamic (at run-time). 

We'll ignore many details of what can be in a maze and whether a maze game has a single or multiple players. Instead, we'll just focus on how mazes get created. We define a maze as a set of rooms. A room knows its neighbors; possible neighbors are another room, a wall, or a door to another room. 

enum Direction {North, South, East, West};

The class MapSite is the common abstract class for all the components of a maze. To simplify the example, MapSite defines only one operation, Enter. Its meaning depends on what you're entering. If you enter a room, then your location changes. If you try to enter a door, then one of two things happen: If the door is open, you go into the next room. If the door is closed, then you hurt your nose.

class MapSite {
public:
    virtual void Enter() = 0;
};

对象作为参数传递
Enter provides a simple basis for more sophisticated game operations. For example, if you are in a room and say "Go East," the game can simply determine which MapSite is immediately to the east and then call Enter on it. The subclass-specific Enter operation will figure out whether your location changed or your nose got hurt. In a real game, Enter could take the player object that's moving about as an argument.

Room is the concrete subclass of MapSite that defines the key relationships between components in the maze. It maintains references to other MapSite objects and stores a room number. The number will identify rooms in the maze.

class Room : public MapSite {
public:
    Room(int roomNo);

    MapSite* GetSide(Direction) const;
    void SetSide(Direction, MapSite*);

    virtual void Enter();

private:
    MapSite* _sides[4];
    int _roomNumber;
};


class Wall : public MapSite {
public:
    Wall();

    virtual void Enter();
};

class Door : public MapSite {
public:
    Door(Room* = 0, Room* = 0);

    virtual void Enter();
    Room* OtherSideFrom(Room*);

private:
    Room* _room1;
    Room* _room2;
    bool _isOpen;
};

We need to know about more than just the parts of a maze. We'll also define a Maze class to represent a collection of rooms. Maze can also find a particular room given a room number using its RoomNo operation.

class Maze {
public:
    Maze();

    void AddRoom(Room*);
    Room* RoomNo(int) const;
private:
    // ...
};
RoomNo could do a look-up using a linear search, a hash table, or even a simple array. But we won't worry about such details here. Instead, we'll focus on how to specify the components of a maze object.

Another class we define is MazeGame, which creates the maze. One straightforward way to create a maze is with a series of operations that add components to a maze and then interconnect them. For example, the following member function will create a maze consisting of two rooms with a door between them:

Maze* MazeGame::CreateMaze () {
    Maze* aMaze = new Maze;
    Room* r1 = new Room(1);
    Room* r2 = new Room(2);
    Door* theDoor = new Door(r1, r2);

    aMaze->AddRoom(r1);
    aMaze->AddRoom(r2);

    r1->SetSide(North, new Wall);
    r1->SetSide(East, theDoor);
    r1->SetSide(South, new Wall);
    r1->SetSide(West, new Wall);

    r2->SetSide(North, new Wall);
    r2->SetSide(East, new Wall);
    r2->SetSide(South, new Wall);
    r2->SetSide(West, theDoor);

    return aMaze;
}
This function is pretty complicated, considering that all it does is create a maze with two rooms. There are obvious ways to make it simpler. For example, the Room constructor could initialize the sides with walls ahead of time. But that just moves the code somewhere else. The real problem with this member function isn't its size but its inflexibility. It hard-codes the maze layout. Changing the layout means changing this member function, either by overriding it—which means reimplementing the whole thing—or by changing parts of it—which is error-prone and doesn't promote reuse.

Suppose you wanted to reuse an existing maze layout for a new game containing (of all things) enchanted mazes. The enchanted maze game has new kinds of components, like DoorNeedingSpell, a door that can be locked and opened subsequently only with a spell; and EnchantedRoom, a room that can have unconventional items in it, like magic keys or spells. How can you change CreateMaze easily so that it creates mazes with these new classes of objects?

In this case, the biggest barrier to change lies in hard-coding the classes that get instantiated. The creational patterns provide different ways to remove explicit references to concrete classes from code that needs to instantiate them:

If CreateMaze calls virtual functions instead of constructor calls to create the rooms, walls, and doors it requires, then you can change the classes that get instantiated by making a subclass of MazeGame and redefining those virtual functions. This approach is an example of the Factory Method pattern. 
If CreateMaze is passed an object as a parameter to use to create rooms, walls, and doors, then you can change the classes of rooms, walls, and doors by passing a different parameter. This is an example of the Abstract Factory pattern. 
If CreateMaze is passed an object that can create a new maze in its entirety using operations for adding rooms, doors, and walls to the maze it builds, then you can use inheritance to change parts of the maze or the way the maze is built. This is an example of the Builder pattern. 
If CreateMaze is parameterized by various prototypical room, door, and wall objects, which it then copies and adds to the maze, then you can change the maze's composition by replacing these prototypical objects with different ones. This is an example of the Prototype pattern.
The remaining creational pattern, Singleton , can ensure there's only one maze per game and that all game objects have ready access to it—without resorting to global variables or functions. Singleton also makes it easy to extend or replace the maze without touching existing code.


Abstract Factory
Intent
Provide an interface for creating families of related or dependent objects without specifying their concrete classes.
We can solve this problem by defining an abstract WidgetFactory class that declares an interface for creating each basic kind of widget. There's also an abstract class for each kind of widget, and concrete subclasses implement widgets for specific look-and-feel standards. WidgetFactory's interface has an operation that returns a new widget object for each abstract widget class. Clients call these operations to obtain widget instances, but clients aren't aware of the concrete classes they're using. Thus clients stay independent of the prevailing look and feel.
In other words, clients only have to commit to an interface defined by an abstract class, not a particular concrete class.

Use the Abstract Factory pattern when

a system should be independent of how its products are created, composed, and represented. 
a system should be configured with one of multiple families of products. 
a family of related product objects is designed to be used together, and you need to enforce this constraint. 
you want to provide a class library of products, and you want to reveal just their interfaces, not their implementations.
AbstractFactory (WidgetFactory) 
declares an interface for operations that create abstract product objects.
ConcreteFactory (MotifWidgetFactory, PMWidgetFactory) 
implements the operations to create concrete product objects.
AbstractProduct (Window, ScrollBar) 
declares an interface for a type of product object.
ConcreteProduct (MotifWindow, MotifScrollBar) 
defines a product object to be created by the corresponding concrete factory. 

implements the AbstractProduct interface.
Client 
uses only interfaces declared by AbstractFactory and AbstractProduct classes.

The Abstract Factory pattern has the following benefits and liabilities:

It isolates concrete classes. The Abstract Factory pattern helps you control the classes of objects that an application creates. Because a factory encapsulates the responsibility and the process of creating product objects, it isolates clients from implementation classes. Clients manipulate instances through their abstract interfaces. Product class names are isolated in the implementation of the concrete factory; they do not appear in client code. 
It makes exchanging product families easy. The class of a concrete factory appears only once in an application—that is, where it's instantiated. This makes it easy to change the concrete factory an application uses. It can use different product configurations simply by changing the concrete factory. Because an abstract factory creates a complete family of products, the whole product family changes at once. In our user interface example, we can switch from Motif widgets to Presentation Manager widgets simply by switching the corresponding factory objects and recreating the interface. 
It promotes consistency among products. When product objects in a family are designed to work together, it's important that an application use objects from only one family at a time. AbstractFactory makes this easy to enforce. 
Supporting new kinds of products is difficult. Extending abstract factories to produce new kinds of Products isn't easy. That's because the AbstractFactory interface fixes the set of products that can be created. Supporting new kinds of products requires extending the factory interface, which involves changing the AbstractFactory class and all of its subclasses. We discuss one solution to this problem in the Implementation section.

Implementation
Here are some useful techniques for implementing the Abstract Factory pattern.

Factories as singletons. An application typically needs only one instance of a ConcreteFactory per product family. So it's usually best implemented as a Singleton . 
Creating the products. AbstractFactory only declares an interface for creating products. It's up to ConcreteProduct subclasses to actually create them. The most common way to do this is to define a factory method (see Factory Method ) for each product. A concrete factory will specify its products by overriding the factory method for each. While this implementation is simple, it requires a new concrete factory subclass for each product family, even if the product families differ only slightly. 



A more flexible but less safe design is to add a parameter to operations that create objects. This parameter specifies the kind of object to be created. It could be a class identifier, an integer, a string, or anything else that identifies the kind of product. In fact with this approach, AbstractFactory only needs a single "Make" operation with a parameter indicating the kind of object to create. This is the technique used in the Prototype- and the class-based abstract factories discussed earlier.

This variation is easier to use in a dynamically typed language like Smalltalk than in a statically typed language like C++. You can use it in C++ only when all objects have the same abstract base class or when the product objects can be safely coerced to the correct type by the client that requested them. The implementation section of Factory Method shows how to implement such parameterized operations in C++.

But even when no coercion is needed, an inherent problem remains: All products are returned to the client with the same abstract interface as given by the return type. The client will not be able to differentiate or make safe assumptions about the class of a product. If clients need to perform subclass-specific operations, they won't be accessible through the abstract interface. Although the client could perform a downcast (e.g., with dynamic_cast in C++), that's not always feasible or safe, because the downcast can fail. This is the classic trade-off for a highly flexible and extensible interface.




Class MazeFactory can create components of mazes. It builds rooms, walls, and doors between rooms. It might be used by a program that reads plans for mazes from a file and builds the corresponding maze. Or it might be used by a program that builds mazes randomly. Programs that build mazes take a MazeFactory as an argument so that the programmer can specify the classes of rooms, walls, and doors to construct.

class MazeFactory {
public:
    MazeFactory();

    virtual Maze* MakeMaze() const
        { return new Maze; }
    virtual Wall* MakeWall() const
        { return new Wall; }
    virtual Room* MakeRoom(int n) const
        { return new Room(n); }
    virtual Door* MakeDoor(Room* r1, Room* r2) const
        { return new Door(r1, r2); }
};

Recall that the member function CreateMaze () builds a small maze consisting of two rooms with a door between them. CreateMaze hard-codes the class names, making it difficult to create mazes with different components.

Here's a version of CreateMaze that remedies that shortcoming by taking a MazeFactory as a parameter:

Maze* MazeGame::CreateMaze (MazeFactory& factory) {
    Maze* aMaze = factory.MakeMaze();
    Room* r1 = factory.MakeRoom(1);
    Room* r2 = factory.MakeRoom(2);
    Door* aDoor = factory.MakeDoor(r1, r2);

    aMaze->AddRoom(r1);
    aMaze->AddRoom(r2);

    r1->SetSide(North, factory.MakeWall());
    r1->SetSide(East, aDoor);
    r1->SetSide(South, factory.MakeWall());
    r1->SetSide(West, factory.MakeWall());

    r2->SetSide(North, factory.MakeWall());
    r2->SetSide(East, factory.MakeWall());
    r2->SetSide(South, factory.MakeWall());
    r2->SetSide(West, aDoor);

    return aMaze;
}

We can create EnchantedMazeFactory, a factory for enchanted mazes, by subclassing MazeFactory. EnchantedMazeFactory will override different member functions and return different subclasses of Room, Wall, etc.

class EnchantedMazeFactory : public MazeFactory {
public:
    EnchantedMazeFactory();

    virtual Room* MakeRoom(int n)  const
        { return new EnchantedRoom(n, CastSpell()); }

    virtual Door* MakeDoor(Room* r1, Room* r2)  const
        { return new DoorNeedingSpell(r1, r2); }

protected:
    Spell* CastSpell() const;
};

Now suppose we want to make a maze game in which a room can have a bomb set in it. If the bomb goes off, it will damage the walls (at least). We can make a subclass of Room keep track of whether the room has a bomb in it and whether the bomb has gone off. We'll also need a subclass of Wall to keep track of the damage done to the wall. We'll call these classes RoomWithABomb and BombedWall.

The last class we'll define is BombedMazeFactory, a subclass of MazeFactory that ensures walls are of class BombedWall and rooms are of class RoomWithABomb. BombedMazeFactory only needs to override two functions:

Wall* BombedMazeFactory::MakeWall () const {
    return new BombedWall;
}

Room* BombedMazeFactory::MakeRoom(int n) const {
    return new RoomWithABomb(n);
}

To build a simple maze that can contain bombs, we simply call CreateMaze with a BombedMazeFactory.

MazeGame game;
BombedMazeFactory factory;

game.CreateMaze(factory);

CreateMaze can take an instance of EnchantedMazeFactory just as well to build enchanted mazes.


The Builder pattern captures all these relationships. Each converter class is called a builder in the pattern, and the reader is called the director. Applied to this example, the Builder pattern separates the algorithm for interpreting a textual format (that is, the parser for RTF documents) from how a converted format gets created and represented. This lets us reuse the RTFReader's parsing algorithm to create different text representations from RTF documents—just configure the RTFReader with different subclasses of TextConverter.

Use the Builder pattern when

the algorithm for creating a complex object should be independent of the parts that make up the object and how they're assembled.

the construction process must allow different representations for the object that's constructed.

Collaborations
The client creates the Director object and configures it with the desired Builder object. 
Director notifies the builder whenever a part of the product should be built. 
Builder handles requests from the director and adds parts to the product. 
The client retrieves the product from the builder.
Here are key consequences of the Builder pattern:

It lets you vary a product's internal representation. The Builder object provides the director with an abstract interface for constructing the product. The interface lets the builder hide the representation and internal structure of the product. It also hides how the product gets assembled. Because the product is constructed through an abstract interface, all you have to do to change the product's internal representation is define a new kind of builder. 
It isolates code for construction and representation. The Builder pattern improves modularity by encapsulating the way a complex object is constructed and represented. Clients needn't know anything about the classes that define the product's internal structure; such classes don't appear in Builder's interface. 
Each ConcreteBuilder contains all the code to create and assemble a particular kind of product. The code is written once; then different Directors can reuse it to build Product variants from the same set of parts. In the earlier RTF example, we could define a reader for a format other than RTF, say, an SGMLReader, and use the same TextConverters to generate ASCIIText, TeXText, and TextWidget renditions of SGML documents. 

It gives you finer control over the construction process. Unlike creational patterns that construct products in one shot, the Builder pattern constructs the product step by step under the director's control. Only when the product is finished does the director retrieve it from the builder. Hence the Builder interface reflects the process of constructing the product more than other creational patterns. This gives you finer control over the construction process and consequently the internal structure of the resulting product.
Here are other implementation issues to consider:

Assembly and construction interface. Builders construct their products in step-by-step fashion. Therefore the Builder class interface must be general enough to allow the construction of products for all kinds of concrete builders. 
A key design issue concerns the model for the construction and assembly process. A model where the results of construction requests are simply appended to the product is usually sufficient. In the RTF example, the builder converts and appends the next token to the text it has converted so far.

But sometimes you might need access to parts of the product constructed earlier. In the Maze example we present in the Sample Code, the MazeBuilder interface lets you add a door between existing rooms. Tree structures such as parse trees that are built bottom-up are another example. In that case, the builder would return child nodes to the director, which then would pass them back to the builder to build the parent nodes. 

Why no abstract class for products? In the common case, the products produced by the concrete builders differ so greatly in their representation that there is little to gain from giving different products a common parent class. In the RTF example, the ASCIIText and the TextWidget objects are unlikely to have a common interface, nor do they need one. Because the client usually configures the director with the proper concrete builder, the client is in a position to know which concrete subclass of Builder is in use and can handle its products accordingly. 
Empty methods as default in Builder. In C++, the build methods are intentionally not declared pure virtual member functions. They're defined as empty methods instead, letting clients override only the operations they're interested in.

We'll define a variant of the CreateMaze member function that takes a builder of class MazeBuilder as an argument.

The MazeBuilder class defines the following interface for building mazes:
外壳,provide general interface and hide information from outside, and can be reused.
Note that MazeBuilder does not create mazes itself; its main purpose is just to define an interface for creating mazes.

class MazeBuilder {
public:
    virtual void BuildMaze() { }
    virtual void BuildRoom(int room) { }
    virtual void BuildDoor(int roomFrom, int roomTo) { }

    virtual Maze* GetMaze() { return 0; }
protected:
    MazeBuilder();
};


The subclass StandardMazeBuilder is an implementation that builds simple mazes. It keeps track of the maze it's building in the variable _currentMaze.
this is the specifics class public from MazeBuilder:
class StandardMazeBuilder : public MazeBuilder {
public:
    StandardMazeBuilder();

    virtual void BuildMaze();
    virtual void BuildRoom(int);
    virtual void BuildDoor(int, int);

    virtual Maze* GetMaze();
private:
    Direction CommonWall(Room*, Room*);
    Maze* _currentMaze;
};


This interface can create three things: 
(1) the maze, 
(2) rooms with a particular room number, and 
(3) doors between numbered rooms. The GetMaze operation returns the maze to the client. Subclasses of MazeBuilder will override this operation to return the maze that they build.

All the maze-building operations of MazeBuilder do nothing by default. They're not declared pure virtual to let derived classes override only those methods in which they're interested.

Given the MazeBuilder interface, we can change the CreateMaze member function to take this builder as a parameter.
pass as a parameter
Maze* MazeGame::CreateMaze (MazeBuilder& builder) {
    builder.BuildMaze();

    builder.BuildRoom(1);
    builder.BuildRoom(2);
    builder.BuildDoor(1, 2);

    return builder.GetMaze();
}

CommonWall is a utility operation that determines the direction of the common wall between two rooms.

The StandardMazeBuilder constructor simply initializes _currentMaze.

StandardMazeBuilder::StandardMazeBuilder () {
    _currentMaze = 0;
}

BuildMaze instantiates a Maze that other operations will assemble and eventually return to the client (with GetMaze).

void StandardMazeBuilder::BuildMaze () {
    _currentMaze = new Maze;
}

Maze* StandardMazeBuilder::GetMaze () {
    return _currentMaze;
}

The BuildRoom operation creates a room and builds the walls around it:

void StandardMazeBuilder::BuildRoom (int n) {
    if (!_currentMaze->RoomNo(n)) {
        Room* room = new Room(n);
        _currentMaze->AddRoom(room);

        room->SetSide(North, new Wall);
        room->SetSide(South, new Wall);
        room->SetSide(East, new Wall);
        room->SetSide(West, new Wall);
    }
}
To build a door between two rooms, StandardMazeBuilder looks up both rooms in the maze and finds their adjoining wall:

void StandardMazeBuilder::BuildDoor (int n1, int n2) {
    Room* r1 = _currentMaze->RoomNo(n1);
    Room* r2 = _currentMaze->RoomNo(n2);
    Door* d = new Door(r1, r2);

    r1->SetSide(CommonWall(r1,r2), d);
    r2->SetSide(CommonWall(r2,r1), d);


Clients can now use CreateMaze in conjunction with StandardMazeBuilder to create a maze:

Maze* maze;
MazeGame game;
StandardMazeBuilder builder;

game.CreateMaze(builder);
maze = builder.GetMaze();


pros:
We could have put all the StandardMazeBuilder operations in Maze and let each Maze build itself. But making Maze smaller makes it easier to understand and modify, and StandardMazeBuilder is easy to separate from Maze. Most importantly, separating the two lets you have a variety of MazeBuilders, each using different classes for rooms, walls, and doors.

A more exotic MazeBuilder is CountingMazeBuilder. This builder doesn't create a maze at all; it just counts the different kinds of components that would have been created.

class CountingMazeBuilder : public MazeBuilder {
public:
    CountingMazeBuilder();

    virtual void BuildMaze();
    virtual void BuildRoom(int);
    virtual void BuildDoor(int, int);
    virtual void AddWall(int, Direction);

    void GetCounts(int&, int&) const;
private:
    int _doors;
    int _rooms;
};

The constructor initializes the counters, and the overridden MazeBuilder operations increment them accordingly.

CountingMazeBuilder::CountingMazeBuilder () {
    _rooms = _doors = 0;
}

void CountingMazeBuilder::BuildRoom (int) {
    _rooms++;
}

void CountingMazeBuilder::BuildDoor (int, int) {
    _doors++;
}

void CountingMazeBuilder::GetCounts (
    int& rooms, int& doors
) const {
    rooms = _rooms;
    doors = _doors;
}



int rooms, doors;
MazeGame game;
CountingMazeBuilder builder;

game.CreateMaze(builder);
builder.GetCounts(rooms, doors);

cout << "The maze has "
     << rooms << " rooms and "
     << doors << " doors" << endl;



Builder is a common pattern in Smalltalk-80 [Par90]:

The Parser class in the compiler subsystem is a Director that takes a ProgramNodeBuilder object as an argument. A Parser object notifies its ProgramNodeBuilder object each time it recognizes a syntactic construct. When the parser is done, it asks the builder for the parse tree it built and returns it to the client. 
ClassBuilder is a builder that Classes use to create subclasses for themselves. In this case a Class is both the Director and the Product. 
ByteCodeStream is a builder that creates a compiled method as a byte array. ByteCodeStream is a nonstandard use of the Builder pattern, because the complex object it builds is encoded as a byte array, not as a normal Smalltalk object. But the interface to ByteCodeStream is typical of a builder, and it would be easy to replace ByteCodeStream with a different class that represented programs as a composite object.

Abstract Factory is similar to Builder in that it too may construct complex objects. The primary difference is that the Builder pattern focuses on constructing a complex object step by step. Abstract Factory's emphasis is on families of product objects (either simple or complex). Builder returns the product as a final step, but as far as the Abstract Factory pattern is concerned, the product gets returned immediately.

A Composite is what the builder often builds.

Factory Method
Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

Frameworks use abstract classes to define and maintain relationships between objects. A framework is often responsible for creating these objects as well.


Consider a framework for applications that can present multiple documents to the user. Two key abstractions in this framework are the classes Application and Document. Both classes are abstract, and clients have to subclass them to realize their application-specific implementations. To create a drawing application, for example, we define the classes DrawingApplication and DrawingDocument. The Application class is responsible for managing Documents and will create them as required—when the user selects Open or New from a menu, for example.

Because the particular Document subclass to instantiate is application-specific, the Application class can't predict the subclass of Document to instantiate—the Application class only knows when a new document should be created, not what kind of Document to create. This creates a dilemma: The framework must instantiate classes, but it only knows about abstract classes, which it cannot instantiate.

The Factory Method pattern offers a solution. It encapsulates the knowledge of which Document subclass to create and moves this knowledge out of the framework.
Use the Factory Method pattern when

a class can't anticipate the class of objects it must create. 
a class wants its subclasses to specify the objects it creates. 
classes delegate responsibility to one of several helper subclasses, and you want to localize the knowledge of which helper subclass is the delegate.


Product (Document) 
defines the interface of objects the factory method creates.
ConcreteProduct (MyDocument) 
implements the Product interface.
Creator (Application) 
declares the factory method, which returns an object of type Product. Creator may also define a default implementation of the factory method that returns a default ConcreteProduct object. 

may call the factory method to create a Product object.
ConcreteCreator (MyApplication) 
overrides the factory method to return an instance of a ConcreteProduct.

Factory methods eliminate the need to bind application-specific classes into your code. The code only deals with the Product interface; therefore it can work with any user-defined ConcreteProduct classes.



























