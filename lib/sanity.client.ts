// lib/sanity.client.ts
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'cwjtbne7',
  dataset: 'production',
  apiVersion: '2024-02-09',
  useCdn: true,
  ignoreBrowserTokenWarning: true,
});

// Use the named export factory function
const builder = createImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);