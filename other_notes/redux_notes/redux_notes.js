/*
https://medium.com/@adamrackis/normalizing-redux-stores-for-maximum-code-reuse-ae6e3844ae95#.3tqprbbh1
Object oriented solutions like MobX reduce boilerplate, but leave you on your own to shape your application in a way that’s testable, cohesive, and not overly coupled — in other words object-oriented analysis and design.
why MobX is OO solutions? where is the trade-off?
what is 'normalizing your stores' in redux?
https://medium.com/@adamrackis/querying-a-redux-store-37db8c7f3b0f#.nnotoyd6x
redux docs:
Any component wrapped with connect() call will receive a dispatch function as a prop, and any state it needs from the global state. In most cases you will only pass the first argument to connect(), which is a function we call a selector. This function takes the global Redux store’s state, and returns the props you need for the component. In the simplest case, you can just return the state given to you (i.e. pass identity function), but you may also wish to transform it first.
To make performant memoized transformations with composable selectors, check out reselect. 

why nomalized state?
This is followed by a code sample with a React component connected with a selector doing a slight transform on the store. It’s easy to miss here a key point: your store should contain flat, simple data that’s shaped as needed for your components in a selector downstream. This was also mentioned at the very beginning of the docs:

Note on Relationships
In a more complex app, you’re going to want different entities to reference each other. We suggest that you keep your state as normalized as possible, without any nesting. Keep every entity in an object stored with an ID as a key, and use IDs to reference it from other entities, or lists. Think of the app’s state as a database. This approach is described in normalizr’s documentation in detail. For example, keeping todosById: { id -> todo } and todos: array<id> inside the state would be a better idea in a real app, but we’re keeping the example simple.

why hard?
think of app's state as a database.
The Problem

You have a JSON API that returns deeply nested objects;
You want to port your app to Flux or Redux;
You noticed it's hard for Stores (or Reducers) to consume data from nested API responses.


important
I’m sure I’m not the only one who didn’t focus on this on my read through the docs. Unfortunately missing, and failing to internalize this advice will likely add a great deal of complexity and difficulty to your application

Example 1: Hierarchical Subjects
Imagine you’re writing a book tracking application, where books can be associated with zero or more subjects, and the subjects lie in a hierarchy: American History beneath History, and so on.
A function which stacks a flat list of these subjects (with MongoDB materialized paths) might look like this*/
function stackAndGetTopLevelSubjects(subjects){//过滤出每个subject下路径符合正则的元素汇总到subject.children里面
    subjects.forEach(s => {
        s.children = [];
        s.children.push(...subjects.filter(sc => new RegExp(`,${s._id},$`).test(sc.path)));//push multi-item one time
    });
    return subjects.filter(s => s.path == null);//top level是path值为null的
}

It might be tempting to incorporate such a function directly in your store like this (in part)

function subjectsReducer(state = initialSubjectsState(), action = {}) {
    switch (action.type) {
        case LOAD_SUBJECTS_RESULTS:
            return Object.assign({}, state, {list: stackAndGetTopLevelSubjects(action.subjects)});

    }
}

Now the subjects coming out of your store are stacked and ready for consumption in the UI. This may seem ostensibly good, but it creates problems. Consider what would happen if the user wants to edit a subject deep in the hierarchy. You now you have to flatten the hierarchy to both find it, and update it when the editing is finished.


function subjectsReducer(state = initialSubjectsState(), action = {}){
    switch(action.type){
        case LOAD_SUBJECTS_RESULTS:
            return Object.assign({}, state, { list: stackAndGetTopLevelSubjects(action.subjects) });
        case EDIT_SUBJECT:
            var editingSubject = Object.assign({}, [...flattenedSubjects(state.list)].find(s => s._id == action._id)),
                newSubjectParent;

            var eligibleParents = [...flattenedSubjects(state.list)]
                .filter(s => s._id !== action._id && (!new RegExp(`,${action._id},`).test(s.path)));

            if (editingSubject.path == null){
                newSubjectParent = null;
            } else {
                let hierarchy = editingSubject.path.split(',');
                newSubjectParent = hierarchy[hierarchy.length - 2];
            }

            return Object.assign({}, state, { editSubjectsPacket: Object.assign({}, state.editSubjectsPacket, { newSubjectName: editingSubject.name, newSubjectParent, editingSubject, eligibleParents }) });
        case UPDATE_SUBJECT_RESULTS:
            if ((action.existingParent || null) == (action.newParent || null)) {
                //parent's the same - update name and we're done
                let existingSubjects = [...flattenedSubjects(state.list)],
                    tweakedSubjects = existingSubjects.map(s => s._id == action._id ? Object.assign({}, s, { name: action.newName }) : s);

                return Object.assign({}, state, { list: stackAndGetTopLevelSubjects(tweakedSubjects) });
            } else {
                //new parent - the tree is now affected
                //not the most efficient code ... flatten all subjects, rip out those that were affected, re-stack
                let existingSubjects = [...flattenedSubjects(state.list)],
                    affectedIds = action.affectedSubjects.map(s => '' + s._id),
                    tweakedSubjects = existingSubjects.map(s => Object.assign({}, s)).filter(s => affectedIds.indexOf('' + s._id) == -1);

                return Object.assign({}, state, { list: stackAndGetTopLevelSubjects(tweakedSubjects.concat(action.affectedSubjects)) });
            }
    }
    return state;
}

function *flattenedSubjects(subjects){//[...flattenedSubjects(state.list)]这个的作用是不是先循环取到subject然后再一个个取它的children?哪里调用了next()?
    for (let subject of subjects){
        yield subject;
        if (subject.children.length) {
            yield* flattenedSubjects(subject.children);
        }
    }
}

generator:
生成器是一种可以从中退出并在之后重新进入的函数。生成器的环境（绑定的变量）会在每次执行后被保存，下次进入时可继续使用。

调用一个生成器函数并不马上执行它的主体，而是返回一个这个生成器函数的迭代器（iterator）对象。当这个迭代器的next()方法被调用时，生成器函数的主体会被执行直至第一个yield表达式，该表达式定义了迭代器返回的值，或者，被 yield*委派至另一个生成器函数。next()方法返回一个对象，该对象有一个value属性，表示产出的值，和一个done属性，表示生成器是否已经产出了它最后的值。
eg:
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20


Painful. Of course there are duplicate and cacheable calls to flattenSubjects in the EDIT_SUBJECT action handler, and there’s a need to compose editSubjectsPacket a bit better. But that’s the least of the problems here: the code is overly complex.
Normalizing our data
The analogy to a relational DBMS here
We suggest that you keep your state as normalized as possible, without any nesting.
is surprisingly helpful. Storing subjects as a hash, keyed by _id yields a much better result. Our stacking functionality in the store is now simply

function subjectsReducer(state = initialSubjectsState(), action = {}){
    switch(action.type){
        case LOAD_SUBJECTS_RESULTS:
            return Object.assign({}, state, { list: subjectsToHash(action.subjects) });
    }
    return state;
}

function subjectsToHash(subjects){//数组转成hash
    let hash = {};
    subjects.forEach(s => hash[s._id] = s);
    return hash;
}

And the code to update modified subjects is much simpler

function subjectsReducer(state = initialSubjectsState(), action = {}){
    switch(action.type){
        case LOAD_SUBJECTS_RESULTS:
            return Object.assign({}, state, { list: subjectsToHash(action.subjects) });
        case EDIT_SUBJECT:
            var editingSubject = state.list[action._id],
                newSubjectParent,
                eligibleParents = flattenedSubjects(state.list).filter(s => s._id !== action._id && (!new RegExp(`,${action._id},`).test(s.path)));

            if (editingSubject.path == null){
                newSubjectParent = null;
            } else {
                let hierarchy = editingSubject.path.split(',');
                newSubjectParent = hierarchy[hierarchy.length - 2];
            }

            return Object.assign({}, state, { editSubjectsPacket: Object.assign({}, state.editSubjectsPacket, { newSubjectName: editingSubject.name, newSubjectParent, editingSubject, eligibleParents }) });
        case UPDATE_SUBJECT_RESULTS:
            let changedSubjects = subjectsToHash(action.affectedSubjects);
            return Object.assign({}, state, { list: Object.assign({}, state.list, changedSubjects) });
    }
    return state;
}

function subjectsToHash(subjects){
    let hash = {};
    subjects.forEach(s => hash[s._id] = s);
    return hash;
}

function flattenedSubjects(subjects){
    return Object.keys(subjects).map(k => subjects[k]);
}

But now our store’s subjects list is just a somewhat useless JavaScript object with keys relating _id -> subject. To restore things to how they were, we use a selector when connecting our store to React. It looks like this in part

const bookListSelector = state => ({
    subjects: Object.assign({}, state.bookList.subjects, {list: stackAndGetTopLevelSubjects(state.bookList.subjects.list)}),
    books: Object.assign({}, state.bookList.books, {list: booksWithSubjectsSelector(state.bookList)})
});

function stackAndGetTopLevelSubjects(subjectsHash){
    let subjects = Object.keys(subjectsHash).map(_id => subjectsHash[_id]);
    subjects.forEach(s => {
        s.children = [];
        s.children.push(...subjects.filter(sc => new RegExp(`,${s._id},$`).test(sc.path)));
    });
    return subjects.filter(s => s.path == null);
}

Performance?
Pushing the DBMS analogy further, we’ve basically created a view on our data. The downside is that every single time our store changes, the subject stacking will be re-worked, just as the underlying queries are re-executed whenever you query a view.
Just as a database view can be materialized by creating an index on it, we have a (somewhat) similar way to avoid recomputing function calls in JavaScript: memoization. Since our selector here is just a regular function, we can memoize it as we can any other function. Of course we don’t want to manually do this; fortunately there’s a library we can use to do it for us: reselect.

const stackedSubjectsSelector = createSelector(
    [state => state.list],
    list => stackAndGetTopLevelSubjects(list)
);

const bookListSelector = state => ({
    subjects: Object.assign({}, state.bookList.subjects, {list: stackedSubjectsSelector(state.bookList.subjects)}),
    books: Object.assign({}, state.bookList.books, {list: booksWithSubjectsSelector(state.bookList)}),
    filters: state.bookList.filters
});

Now our stacked subjects will only re-compute when the subjects list itself is changed. And yes, the arrow function in stackedSubjectsSelector is completely unnecessary; I included it only for clarity.

Performance, part 2
Now our subjects are completely re-stacked whenever any individual subject is changed. Returning to the indexed view analogy, this would be like an entire clustered index being re-built from scratch whenever any item in the underlying tables is changed — which of course modern engines don’t. It’s doubtful this will matter, but if this code were somehow performance intense / crucial, there’s nothing stopping you from manually memoizing the function, and only recomputing the portions of the tree that actually changed. Naturally this wouldn’t be easy, and should only be done if actually needed.
Example 2: Books’ Subjects
I won’t bother writing out all of the related code, as this post is already too long, but the same idea applies to having each book maintain a list of its subjects. While it’s tempting to stack each book’s subjects after the list is loaded, this has a couple of drawbacks: there’s now a temporal dependency, whereby the list of subjects must be present before the books are loaded; and the books’ subjects need to be re-stacked whenever a set of book results come back, and also whenever a subject is edited or deleted, so the affected books can have their list of subjects updated.
Applying the same principles described above, we instead just maintain a simple list of books and subjects, with each book maintaining a list of subject _ids, with a selector — booksWithSubjectsSelector — written to glue it all together for the UI.

const booksWithSubjectsSelector = createSelector(
    [state => state.books.list, state => state.subjects.list],
    setBookResultsSubjects
);

const stackedSubjectsSelector = createSelector(
    [state => state.list],
    stackAndGetTopLevelSubjects
);

const bookListSelector = state => ({
    subjects: Object.assign({}, state.bookList.subjects, {list: stackedSubjectsSelector(state.bookList.subjects)}),
    books: Object.assign({}, state.bookList.books, {list: booksWithSubjectsSelector(state.bookList)}),
    filters: state.bookList.filters
});