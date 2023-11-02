import { CreateJenkinsJobExecutorSchema } from './schema';

import * as request from 'request';

export default async function runExecutor({
  from,
  name,
  password,
  url,
  username,
}: CreateJenkinsJobExecutorSchema) {
  console.log('Executor ran for CreateJenkinsJob');

  const requestOptions = {
    method: 'POST',
    url: `${url}/createItem?name=${name}&from=${from}&mode=copy`,
    headers: {
      'Content-Type': 'application/xml',
      Authorization: `Basic ${Buffer.from(username + ':' + password).toString(
        'base64'
      )}`,
    },
  };
  try {
    const res = await new Promise((resolve, reject) => {
      request(requestOptions, function (error, response) {
        if (error) reject(error);
        resolve(response.body);
      });
    });
    console.log(res);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
