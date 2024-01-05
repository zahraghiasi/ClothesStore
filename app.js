const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const clothesRoutes = require('./routes/clothesRoutes');
const jwtMiddleware = require('./middlware/jwtMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);
app.use('/api/clothes', jwtMiddleware, clothesRoutes);

module.exports = app;
