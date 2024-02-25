import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

openai_key = os.environ.get('mysecretkey')
client = OpenAI(api_key=openai_key)




def generate_desc(text):
  response = client.completions.create(
          model="gpt-3.5-turbo-instruct",
          prompt="please condense this text into a 6-word image generation prompt: " + text,
          max_tokens=200,
          temperature=0
      )
  
  #print(response.choices[0])
  image_desc = response.choices[0].text.strip()
  print("image desc:", image_desc)
  
  return image_desc


def generate_image_url(image_desc):
  response = client.images.generate(
    model="dall-e-2",
    prompt="Cyberpunk neon-themed illustration of a: " + image_desc,
    size="1024x1024",
    quality="standard",
    n=1,
  )

  image_url = response.data[0].url
  return image_url

#image_desc = generate_desc("I'm here because America is the land of oppotunity and I believe I can manifest my dream here")
#image_url = generate_image_url(image_desc)
#print("Generated image URL:", image_url)