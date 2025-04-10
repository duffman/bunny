import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()

// Serve static files from the public directory
app.use('/public/*', serveStatic({ root: './' }))

// New route for the bunny page
app.get('/', (c) => {
	return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The Giant Sky Bunny</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        h1 {
          color: #333;
          text-align: center;
        }
        .story {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }
        .image-container {
          text-align: center;
          margin: 30px 0;
        }
        img {
          max-width: 100%;
        }
      </style>
    </head>
    <body>
      <h1>The Giant Sky Bunny</h1>
      
      <div class="image-container">
        <img src="/public/good-bunny.png" alt="Giant Bunny from the Sky">
      </div>
      
      <div class="story">
        <p>It appeared without warning on a crisp autumn morning—a colossal rabbit hovering above the city skyline, its fur shimmering with an otherworldly iridescence that seemed to absorb and reflect sunlight in impossible ways. Panicked citizens flooded the streets, smartphones raised to capture footage of the enormous creature that defied all known laws of physics and biology. Military jets scrambled to intercept, but they merely circled the massive lagomorph, which remained perfectly still except for the gentle twitching of its long, satellite-dish-sized ears.</p>
        
        <p>For three days, the giant bunny remained suspended over the city, causing worldwide speculation and fear. Scientists detected unusual electromagnetic frequencies emanating from its form, and religious groups proclaimed it everything from divine judgment to a sign of salvation. World leaders convened emergency meetings while social media exploded with theories ranging from advanced alien technology to a collective hallucination caused by contaminated water supplies.</p>
        
        <p>On the fourth day, when humanity had worked itself into a fever pitch of anxiety and wonder, the rabbit simply began to drop carrots—millions of ordinary orange carrots that fell like gentle rain across the countryside. As suddenly as it had appeared, the creature ascended into the clouds and vanished, leaving behind only the inexplicable bounty of vegetables and a profound sense that humanity had been given a message it was not yet equipped to understand. Decades later, scientists would discover that the carrots contained a unique enzyme that gradually purified soil contamination, beginning a slow but unstoppable healing of Earth's damaged ecosystems.</p>
      </div>
    </body>
    </html>
  `)
})

// API route
app.get('/api/bunny-facts', (c) => {
	return c.json({
					  facts: [
						  "The giant sky bunny is believed to be over 300 feet tall",
						  "Its fur changes color depending on the weather",
						  "Some witnesses report hearing gentle humming sounds when it appears"
					  ]
				  })
})


const port = 3000;



serve({
		  fetch: app.fetch,
		  port
	  }).on('error', (err) => {
	if (err.code === 'EADDRINUSE') {
		console.error(`Port ${port} is in use.`);
		process.exit(1);
	} else {
		console.error(`Server error: ${err.message}`);
	}
});
