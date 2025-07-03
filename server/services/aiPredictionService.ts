import { saleModel } from '../models/saleModel';
import * as tf from '@tensorflow/tfjs-node';

export const predictSales = async () => {
  const sales = await saleModel.find().sort({ createdAt: 1 });
  const data = sales.map(s => s.totalAmount);

  if (data.length < 2) return 0;

  const inputs = tf.tensor1d(data.slice(0, -1));
  const labels = tf.tensor1d(data.slice(1));

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

  await model.fit(inputs, labels, { epochs: 50 });

  const last = tf.tensor1d([data[data.length - 1]]);
  const prediction = model.predict(last) as tf.Tensor;
  const predictedValue = prediction.dataSync()[0];
  return predictedValue;
};
