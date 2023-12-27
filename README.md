#*Chan4*
This is a repository to maintain the source for a personal project, a web app with 4chan(predictable) like boards and flexibility of reddit to create communities.

*CodeBase*
The entirety of code is written in Next.js, with ChakraUI and Firestore for databasing.

*Directions*
If you want to reproduce a copy of the website, locally or to create another application, you can start with,
1. Create a .env.local file in the project directory (which contains the src folder). Create the variables as reqd in /src/firebase/client.tsx,
you are recommended to lookup a manual or a video for the same, or just hit me up. An alternative is to use the app's configuration directly in the /src/firebase/client.tsx file.
1. Run npm i in the same directory as above to install the dependencies.
2. Run npm run dev to finally start the local server.
3. You are free to continue. . .

#*Issues*
You are welcome issues to the issues page, preferably attach a reproducible example, doing the same can save a lot of time and gives a heads up as to start fixing the problem. . .

#*Reports and Data*
For now the (hosted) application uses a spark plan, which restricts resources, in terms of reads/ writes, we'll upgrade if we seem to need more of the same.