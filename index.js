const { Etcd } = require("node-etcd3");
const etcd = new Etcd(["etcd:2379"]);

var ip = require("ip");
var os = require("os");

// console.log("address: ", ip.address(), "host: ", os.hostname());

var instance = {
  host: os.hostname(),
  port: 5001,
  ip: ip.address(),
  name: "livingroom"
}

var  servicekey = "/services/" + instance.host;

// With default lease, keep alive 10s (thus if app killed, dies within 10s

etcd.set(servicekey, JSON.stringify(instance), "client").then( async () => {
  console.log("Key Created.");

  let value = await etcd.get(servicekey, "json");
  console.log("Service Key : ", value);
});

