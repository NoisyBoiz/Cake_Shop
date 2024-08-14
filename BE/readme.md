# Cakes

##### [GET] / Get All Cake
```
localhost:3000/cakes/list
```

##### [GET] / Get Cake By Id
```
localhost:3000/cakes/getById?id=10
```

##### [GET] / Get Cake By Name
```
localhost:3000/cakes/getByName?name=tết
```

##### [GET] / Get Cake By Id_type
```
localhost:3000/cakes/getByIdType?id=0
```

# -------------------------------------------

# Bills

##### [GET] / Get All Bills
```
localhost:3000/bills/list
```

##### [GET] / Get Bill By Id
```
localhost:3000/bills/getById?id=2
```

##### [GET] / Get Bill By Id_client
```
localhost:3000/bills/getByIdClient?id=7
```

##### [GET] / Get Bill By Delivery Date
```
localhost:3000/bills/getByDeliveryDate?startDate=2024-01-30 10:10:00.096&endDate=2024-02-1 10:10:00.096
```

##### [GET] / Get Bill By Create Date
```
localhost:3000/bills/getByCreatedDate?startDate=2024-01-28 10:10:00.096&endDate=2024-02-1 10:10:00.096
```

##### [POST] / Create Total Bill
```
localhost:3000/bills/createTotal
```
###### BODY:
```
{
    "name":"Nguyen Van A",
    "phone_number": "0987654321",
    "address":"Ha Dong",
    "delivery_date": "2024-01-31 10:10:00.096 +00:00",
    "notice": "banh mau vang",
    "list_order":[
        {"id_cake":1,"size":2,"quantity":3}
    ]
}
```

##### [POST] / Create Bill
```
localhost:3000/bills/create
```
###### BODY:
```
{
    "id_client":7,
    "notice":"it ngot",
    "delivery_date":"2024-01-31 10:10:00.096 +00:00"
}
```

##### [POST] / Update Bill
```
localhost:3000/bills/update
```
###### BODY:
```
{
    "id":5,
    "id_client":7,
    "notice":"nhieu kem",
    "delivery_date":"2024-01-31 10:10:00.096 +00:00"
}
```

##### [DELETE] / Delete Bill
```
localhost:3000/bills/delete?id=5
```

# -------------------------------------------

# Client

##### [GET] / Get All Client
```
localhost:3000/clients/list
```

##### [GET] / Get Client By Id
```
localhost:3000/clients/getById?id=7
```

##### [GET] / Get Client By Name
```
localhost:3000/clients/getByName?name=dat
```

##### [GET] / Get Client By Phone Number
```
localhost:3000/clients/getByPhoneNumber?phoneNumber=0912563726
```

##### [GET] / Get Client By Address
```
localhost:3000/clients/getByAddress?address=noi
```

##### [POST] / Create Client
```
localhost:3000/clients/create
```
###### BODY:
```
{
    "name":"do van A",
    "phone_number": "0987123456" ,
    "address": "Ha Dong"
}
```

##### [POST] / Update Client
```
localhost:3000/clients/create
```
###### BODY:
```
{
    "id": 7,
    "name":"Luu Thi C",
    "phone_number": "0987123456" ,
    "address": "Ha Dong"
}
```

##### [DELETE] / Delete Client
```
localhost:3000/clients/delete?id=6
```

# -------------------------------------------

# Order

##### [POST] / Create Order
```
localhost:3000/orders/create
```
###### BODY:
```
{
    "id_cake":18,
    "size": "21x8cm",
    "id_bill":5,
    "quantity":1
}
```

##### [POST] / Update Order
```
localhost:3000/orders/update
```
###### BODY:
```
{
    "id":10,
    "id_cake":15,
    "size": "21x8cm",
    "id_bill":3,
    "quantity":8
}
```

##### [DELETE] / Delete Order
```
localhost:3000/orders/delete?id=7
```