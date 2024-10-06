A cool project inspired by the need to report lost and found items of students at Makerere university

#Backend Architecture
    Database: MongoDB,
    Server: NodeJS,

#Database Organization
    Collections: one collection
    Documents: Lost, Found
    Document schema:name : name of item lost or found, 
                    lfName: name of one reporting either the lost or foundtiem,
                    description: description of item,
                    pictureURL: path to picture on server, 
                    contactFound: contact of the student, 
                    location: geolocation data for the item,
                    type: lost or found

#Frontend Architecture
    Engine: React,
    framework: vite
    