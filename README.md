#  Introduction
In a typical react application, data is passed down from parent to child via props.
It's easy to pass data from one component to another through props for fewer components (2 to 3), but as the app grows, there is a need to add more components that will display some data.

Data management becomes complex as the app's codebase grows. To solve this, react introduced the context API.
	
Context provides a way to pass data through the component tree without having to pass props down manually at every level( [Context](https://reactjs.org/docs/context.html)). Context is primarily used when some data is needed to be accessed by many levels deep down the component hierarchy.

#  Component hierarchy
A component hierarchy is a tree of components. A typical react application has the main component that contains several components nested down the tree. Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.
		
![component tree.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664375105287/zO5VjrEhG.png align="left")
img-src: geeksforgeeks.com

#  Props drilling.
Props (short for properties) are inputs passed to a component(think of it like function parameters, but for components). Props are read-only. 
		
Props drilling refers to a situation when the same data is passed to so many components down the component hierarchy (i.e from parent to child and or siblings).
		
Drilling props down the component tree become cumbersome as the number of component increases. This is one of the use cases where the context API comes in to relieve the components from passing so many props to their children.
		
Example of props drilling.


```javascript	
function Component1() {
			const [user, setUser] = React.useState("Jane Doe!");
		  
			return (
			  <>
				<h1>{`Hello ${user}!`}</h1>
				<Component2 user={user} />
			  </>
			);
		  }
		  
		  function Component2({ user }) {
			return (
			  <>
				<h1>Component 2</h1>
				<Component3 user={user} />
			  </>
			);
		  }
		  
		  function Component3({ user }) {
			return (
			  <>
				<h1>Component 3</h1>
				<Component4 user={user} />
			  </>
			);
		  }
		  
		  function Component4({ user }) {
			return (
			  <>
				<h1>Component 4</h1>
				<h2>{`Hello ${user} again!`}</h2>
			  </>
			);
		  }
		  

		export default Component1;

``` 

# Using the context API. How it works
React.createContext is used to create a context for our components. It returns a Provider and a Consumer. The provider is a component that provides the state for its children. It serves as a store of data for any component that will need it. The consumer, on the other hand, is a component that consumes the data.
		
Let's create a simple react application that will be able to get and change a user's name globally.
We'll use a lite version of a react application, Vite. Head over to [Vite](https://vitejs.dev/guide/) to create a simple react app or follow along below if you already have vite installed
		
Open a terminal in the folder where you want your app to live and run the following command
```npm create vite@latest```
- give it a project name. ```context-example```
- select a framework. ```React```.
- select a variant. ```Javascript```
Follow the rest of the instructions to run the app.

![vite@cra.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664378223035/bWXtXf15v.png align="left")

Our app structure:

![app-structure.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1664377560918/ANWItsodf.png align="left")

i. Creating the context
To create a context, use React.createContext() method.
			
const UserContext = React.createContext();
			
Provide a value in the parent component using the Provider discussed above.

 ```javascript			
function ComponentA() {
		const [user] = useState("Jane Doe");

		 return (
		  <UserContext.Provider value={user}>
		      <h1>{`Hello ${user}! from parent Component`}</h1>
			  <ComponentB />
				</UserContext.Provider>
			  );
	}
```

ii. Using the context value 
To use the context value, use ```React.useContext(context)``` function. It takes the context as an argument.

```javascript			
function ComponentE() {
			  const user = React.useContext(UserContext);

			  return (
				<>
				  <h1>Component 5</h1>
				  <h2>{`Hello ${user} from component E!`}</h2>
				</>
			  );
}
```

# Conclusion and use case
Use the context API where you have the same data flowing in your application from one component to the other, from parent to child, and further deeply nested.
Use it only when you need to share the state between lots of components with a lot of nesting. Most of the time, the data you have in one component will only be relevant to its children, so passing it in props is more indicative and nicer.




















