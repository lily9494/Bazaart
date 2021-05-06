const httpStatus=require("http-status-codes"),
contentTypes=require("./contentTypes"),
utiles=require("./utiles.js");

const routes={
    "GET":{},
    "POST":{}
};

exports.handle=(req,res)=>{
    try{
        routes[req.method][req.url](req,res);
     console.log("handle")
    }
    catch(e){
              res.writeHead(httpStatus.NOT_FOUND, contentTypes.html);
              utiles.getFile("views/error.html",res);
    }
};

exports.get=(url,action)=>{
    routes["GET"][url]=action;
    console.log("get");
};
exports.post=(url,action)=>{
    routes["POST"][url]=action;
};