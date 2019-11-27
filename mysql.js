var mysqlx = require('@mysql/xdevapi');
var client = mysqlx.getClient(
    { user: 'root', host: '192.168.56.41', port: 33060 },
    { pooling: { enabled: true, maxIdleTime: 30000, maxSize: 25, queueTimeout: 10000 } }
);
var $xuser = 1;

client.getSession()
    .then(function (session) {
        // console.log(session.inspect())        
        session.getSchema('test')
            .getCollection('test')
            .find()
            .execute(function (doc) {
                console.log(doc);
                $xuser = doc;
                console.log($xuser);
                return session.close();
            });
        return client.close();
    });
//console.log($xuser);

