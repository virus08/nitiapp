const jsonServer = require('json-server')
const auth = require('json-server-auth') 
 
const app = jsonServer.create()
const router = jsonServer.router('db.json')
app.use((req, res, next) => {
  // console.log(req.headers.origin); // http://localhost:8080
  // res.header("Access-Control-Allow-Origin", req.headers.origin); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", 'http://localhost:8080' );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Authorization, Accept,Option");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  next();
})
// /!\ Bind the router db to the app
app.db = router.db
const rules = auth.rewriter({
    // Permission rules
    users: 600 
    }
);
app.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))
// You must apply the auth middleware before the router
app.use(rules)
app.use(auth)
app.use(router)

app.listen(3000)