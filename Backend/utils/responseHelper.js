/**
 * Helper para estandarizar las respuestas de la API
 */

const successResponse = (res, statusCode = 200, message, data = null) => {
  const response = {
    success: true,
    message: message,
  };
  
  if (data !== null) {
    response.data = data;
  }
  
  return res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode = 500, message, code = null) => {
  const response = {
    success: false,
    message: message,
  };
  
  if (code !== null) {
    response.code = code;
  }
  
  return res.status(statusCode).json(response);
};

module.exports = { successResponse, errorResponse };
