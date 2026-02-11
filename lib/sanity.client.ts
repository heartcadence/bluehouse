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

// Use the default export factory function for version 1.x
const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);