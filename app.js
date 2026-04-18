const express=require("express");
const morgan=require("morgan");
const cors=require("cors");

const app=express();
const port=3000;
//built-in middleware
app.use(express.json()); //parse json  data
app.use(express.static("public")); //serve static files from public folder

//third-party middleware
app.use(morgan("dev")); 
//log HTTP requests
app.use(cors());



//Custom middleware
app.use((req,res,next)=>{
    console.log(`Custom middleware: ${req.method}-${req.url}`);
    req.requestTime=new Date();
    next();
});

//Application-level middleware
app.get("/admin",(req,res,next)=>{
    console.log(`Checking admin access for request at: ${req.requestTime}`);
    next();
},(req,res)=>{
    res.json({ message: "Welcome to the admin panel" });
});

//Router-level middleware
const userRouter=express.Router();
userRouter.use((req,res,next)=>{
    console.log("User router middleware");
    next();
});
userRouter.get("/profile",(req,res)=>{
    res.json({ message: "User list" });
});

app.get("/about", (req, res) => {
    console.log(`Request received at: ${req.requestTime}`);
  res.json({ message: "Welcome to my API" });
});
app.use("/",userRouter);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})