'use strict';
// Create, Read, Update, Delete

const uuid = require('uuid');
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
    if (!data.roaster || typeof data.roaster !== 'string' || data.roaster.length <= 0) {
      throw new Error(`Roaster must be provided and by of type string`)
    }
    if (!data.country || typeof data.country !== 'string' || data.country.length <= 0) {
      throw new Error(`Country must be input as a string`);
    }
    if (data.name && typeof data.name !== 'string') {
        throw new Error(`name must be input as a string or blank`);
      }
    if (data.producer && typeof data.producer !== 'string') {
        throw new Error(`producer must be input as a string or blank`);
      }
    if (data.processing && typeof data.processing !== 'string') {
        throw new Error(`processing must be input as a string or blank`);
      }
    if (data.masl && typeof data.masl !== 'number') {
      throw new Error(`MASL must be a number`)
    }
    if (data.varietals && Array.isArray(data.varietals) === false) {
      throw new Error('Varietals must be an array or nothing')
    }
    if (data.notes && Array.isArray(data.notes) === false) {
      throw new Error('Notes must be an array of stringss or nothing')
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
      id: uuid.v1(),
      roaster: data.roaster,
      country: data.country,
      producer: data.producer || '',
      name: data.name || '',
      varietals: data.varietals || [],
      processing: data.processing || '',
      masl: data.masl || 0,
      createdAt: timestamp,
      updatedAt: timestamp,
      notes: data.notes || []
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

// currently a scan for ALL coffees in the db
const getAll = (evt, ctx, cb) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the list of coffees.',
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

// finds a specific coffee with provided id
const getOne = (evt, ctx, cb) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: evt.pathParameters.id,
    },
  };
  console.log(params);
  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the information for that coffee.',
      });
      return;
    }
    const response = {
      statusCode: 200,
      headers: {      
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Item),
    };
    cb(null, response);
    
  });
}


const Delete = (evt, ctx, cb) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: evt.pathParameters.id,
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

const Update = (evt, ctx, cb) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation 
  // consider abstracting this into one helper function for both create and update because DRY
  try {
    if (Object.keys(data).length === 0) {
      throw new Error('Empty message body or does not parse to JSON');
    }
    if (!data.roaster || typeof data.roaster !== 'string' || data.roaster.length <= 0) {
      throw new Error(`Roaster must be provided and by of type string`)
    }
    if (!data.country || typeof data.country !== 'string' || data.country.length <= 0) {
      throw new Error(`Country must be input as a string`);
    }
    if (data.name && typeof data.name !== 'string') {
        throw new Error(`name must be input as a string or blank`);
      }
    if (data.producer && typeof data.producer !== 'string') {
        throw new Error(`producer must be input as a string or blank`);
      }
    if (data.processing && typeof data.processing !== 'string') {
        throw new Error(`processing must be input as a string or blank`);
      }
    if (data.masl && typeof data.masl !== 'number') {
      throw new Error(`MASL must be a number`)
    }
    if (data.varietals && Array.isArray(data.varietals) === false) {
      throw new Error('Varietals must be an array or nothing')
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
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      '#todo_text': 'text',
    },
    ExpressionAttributeValues: {
      ':text': data.text,
      ':checked': data.checked,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
}

const collectionHandlers = {
  "POST": Create,
  "GET": getAll,
}

const itemHandlers = {
  "GET": getOne,
  "DELETE": Delete,
  "PUT": Update
}

module.exports.coffeeInfo = (evt, ctx, cb) => {
  let handlers = (evt["pathParameters"] == null) ? collectionHandlers : itemHandlers;
const httpMethod = evt["httpMethod"];
if (httpMethod in handlers) {
  return handlers[httpMethod](evt, ctx, cb);
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




