import qs from 'qs';
import config from 'config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import { fetchCounter } from '../common/api/counter';

const { app, express } = (config.NODE_ENV === 'production') ? require('./server.production') : require('./server.development');

app.use(express.static('dist'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  fetchCounter((apiResult) => {
    const params = qs.parse(req.query);
    const counter = parseInt(params.counter, 10) || apiResult || 0;

    // Compile an initial state
    const preloadedState = { counter };

    // Create a new Redux store instance
    const store = configureStore(preloadedState);

    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Send the rendered page back to the client
    res.render('index', { html, finalState: store.getState()});
  });
});

app.get('/data', (req, res) => {
  res.send(data);
});

app.listen(config.port, config.host, function listenHandler() {
  console.info(`App is running on ${config.port}...`);
});