exports.handler = async () => {
    return {
      statusCode: 200,
      body: JSON.stringify({ last_counted: '2022-02-03' })
    }
  };