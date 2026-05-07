import pino, { type DestinationStream } from 'pino';
import pretty from 'pino-pretty';

let stream: DestinationStream;

if (process.env.LOGTAIL_SOURCE_TOKEN) {
  const logtail = (await import('@logtail/pino')).default;
  stream = pino.multistream([
    await logtail({
      sourceToken: process.env.LOGTAIL_SOURCE_TOKEN,
      options: {
        sendLogsToBetterStack: true,
      },
    }),
    {
      stream: pretty(),
    },
  ]);
} else {
  stream = pretty({
    colorize: true,
  });
}

export const logger = pino({ base: undefined }, stream);