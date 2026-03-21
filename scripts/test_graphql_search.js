const fetch = require('node-fetch');

async function testSearch() {
  const query = `
    query GetProducts($search: String, $minPrice: Float, $maxPrice: Float) {
      products(search: $search, minPrice: $minPrice, maxPrice: $maxPrice) {
        title
        price
      }
    }
  `;

  console.log('Testing search for "desk" under $200...');
  let response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { search: 'desk', maxPrice: 200 }
    }),
  });

  let { data } = await response.json();
  console.log('Results:', JSON.stringify(data.products, null, 2));

  console.log('\nTesting search for "GPu" over $1000...');
  response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { search: 'gpu', minPrice: 1000 }
    }),
  });

  ({ data } = await response.json());
  console.log('Results:', JSON.stringify(data.products, null, 2));
}

testSearch();
