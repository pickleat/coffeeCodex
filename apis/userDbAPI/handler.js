'use strict';
// Create, Read, Update, Delete

// const uuid = require('uuid');
const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const Create = (evt, ctx, cb) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(evt.body);
  console.log(data);
  try {
    if (Object.keys(data).length === 0) {
      throw new Error('Empty message body or does not parse to JSON');
    }
    if (!data.user_id || typeof data.user_id !== 'string' || data.user_id.length <= 0) {
      throw new Error(`user_id must be provided and be of type string`)
    }
    if (!data.coffee_id || typeof data.coffee_id !== 'string' || data.coffee_id.length <= 0) {
      throw new Error(`Country must be input as a string`);
    }
    if (!data.rating || typeof data.rating !== 'number' || data.rating > 100 || data.rating < 0){
      data.rating = 0;
    }
  } catch (err) {
    cb(null, {
      statusCode: 400, 
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({"message":err.toString()}),
    })
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      user_id: data.user_id,
      coffee_id: data.coffee_id,
      coffee_rating: data.rating,
      createdAt: timestamp
    },
  };
  console.log(params);

  // write the coffee to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t Put the item in DynamoDB.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(params.Item),
    };
    cb(null, response);
  });
};

// Lists ALL coffees Associated with that user
const List = (evt, ctx, cb) => {
  const data = evt.pathParameters;
  console.log(data)
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    KeyConditionExpression: "#user_id = :user_id",
    ExpressionAttributeNames:{
        "#user_id": "user_id"
    },
    ExpressionAttributeValues: {
        ":user_id": data.user_id
    }
  };
  dynamoDb.query(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the list of coffees for that user.',
      });
      return;
    }
    // create a response
    const response = {
      statusCode: 200,
      headers: {      
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Items),
    };
    cb(null, response);
    return;
})
}

const Read = (evt, ctx, cb) => {
  const user_id = evt.queryStringParameters.user_id
  const coffee_id = evt.queryStringParameters.coffee_id
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      user_id: user_id,
      coffee_id: coffee_id
    }
  };
  console.log(params);

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      return cb(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t get the information for that coffee/user combination.',
      })
    }
    console.log(result);
    const response = {
      statusCode: 200,
      headers: {      
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result),
    };
    return cb(null, response)
  })
}

const Update = (evt, ctx, cb) => {
  console.log('You made it to the Update Function')
  const timestamp = new Date().getTime();
  const data = JSON.parse(evt.body);
  const evt_user_id = evt.evtPathParameters;
  // const coffee_id = evt.queryStringParameters.coffee_id;

  console.log(data);
  // validation 
  // consider abstracting this into one helper function for both create and update because DRY
  try {
    if (Object.keys(data).length === 0) {
      throw new Error('Empty message body or does not parse to JSON');
    }
    if (data.user_id && typeof data.user_id !== 'string' && data.user_id.length <= 0) {
      throw new Error(`Must be of type string`)
    }
    if (data.coffee_id && typeof data.coffee_id !== 'string' && data.coffee_id.length <= 0) {
      throw new Error(`Must be of type string`);
    }
    if (data.coffee_rating && typeof data.coffee_rating !== 'number'){
      throw new Error(`Must be of type number`);
    }
  } catch (err) {
    cb(null, {
      statusCode: 400, 
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({"message":err.toString()}),
    })
  }


  const itemKeys = Object.keys(data)
  const updatedAt = timestamp;
  const possibleKeys = ['user_id','coffee_id'];
  let UpdateExpressionStatement = 'set #updatedAt = :updatedAt, ';
  let ExpressionAttributeNames = {'#updatedAt' : 'updatedAt'};
  let ExpressionAttributeValues = {":updatedAt": updatedAt};
  console.log(itemKeys);
  itemKeys.forEach(key => {
    // console.log(key)
    if(possibleKeys.includes(key)){
        UpdateExpressionStatement += `#${key} = :${key},`
        ExpressionAttributeNames[`#${key}`] = key;
        ExpressionAttributeValues[`:${key}`] = data[key];
    }  
})
  
UpdateExpressionStatement = UpdateExpressionStatement.slice(0, -1);

const params = {
  TableName: process.env.DYNAMODB_TABLE,
  Key: {
    user_id: evt_user_id,
  },
  ExpressionAttributeNames,
  ExpressionAttributeValues,
  UpdateExpression: UpdateExpressionStatement,
  ReturnValues:"ALL_NEW"
};

  console.log(params);

  

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: `Couldn't update the coffee.`,
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {      
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    };
    console.log(response);
    cb(null, response);
  });
}

const Delete = (evt, ctx, cb) => {
  const user_id = evt.queryStringParameters.user_id;
  const coffee_id = evt.queryStringParameters.coffee_id;
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      user_id: user_id,
      coffee_id: coffee_id
    },
  };
  console.log(params);
  // delete the todo from the database
  dynamoDb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t remove that coffee.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify('You deleted the coffee'),
    };
    cb(null, response);
  });
};

const notGetHandlers = {
  "POST": Create,
  "DELETE": Delete,
  "PUT": Update
}



module.exports.userCoffees = (evt, ctx, cb) => {
  console.log(evt);
  console.log('----------------------------------------------------');
  console.log(evt.httpMethod);
  const httpMethod = evt.httpMethod;
  const queryStringParams = evt.queryStringParameters;
  console.log(queryStringParams);
  const evtPathParameters = evt.pathParameters;
  console.log(evtPathParameters);


  if(httpMethod != 'GET'){
    return notGetHandlers[httpMethod](evt, ctx, cb);
  }
  if(httpMethod === 'GET'){
    console.log('making it to the GETS')
    if(evtPathParameters){
      console.log('you got dem path params');
      return List(evt, ctx, cb)
    }
    if(queryStringParams){
      console.log('you got dem queryStringParams')
      return Read(evt, ctx, cb)
      }
    // else{
    //   console.log('you fell to the bottom')
    //   return
    //   }
  }

const response = {
  statusCode: 405,
  headers: {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Credentials" : true
  },
  body: JSON.stringify({
  message: `Invalid HTTP Method: ${httpMethod}`
  }),
};

cb(null, response);
}




