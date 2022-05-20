# Front-end

### Global settings

```bash
#install for libraries (expo initial settings & redux, react-native)
npm install
expo install
```



### Design pattern

```
atomic design pattern
directory:

src|
	|----Atoms
		|--- [].tsx
			...
	|----Molecules
		|--- [].tsx
			...
	|----Organisms
		|--- [].tsx
			...
   	|----Templates
   		|--- [].tsx
   			...
   	|----Pages
   		|--- [].tsx
   		|--- []Container.tsx
   	...
   	//Redux pattern: ducks pattern
   	|----store
   		|---- modules
   			|--- [moduleName].ts
   			|--- index.ts
   		  index.ts
App.tsx
babel.config.js
package.json
...
```

