// lib/sanity.client.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'cwjtbne7',
  dataset: 'production',
  apiVersion: '2024-02-09',
  useCdn: true,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

// Adding ': any' makes the red squiggly line go away
export const urlFor = (source: any) => builder.image(source);