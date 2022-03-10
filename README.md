# Udacity Image Processing Project

# Overview

A project for a udacity course, its main goal is resizing images to desired sizes.

# How to use?

1. Clone this repo to your local machine.
2. Use `npm i` to install all dependencies required.
3. Use `npm run start` to start the server. Feel free to change the port (default: 3000).

# Useful scripts

- `npm run build` - to compile typescript to javascript (output dir: build).
- `npm run lint` - to check for format errors.
- `npm run prettier` - to automatically format your code.
- `npm run test` - to test infrastructure of the code.

# Documentation

## GET /api/images

Resize images to desired sizes, any resized image is saved (and not resized anymore) for future use.

| Param             | Type   | Description                                                            |
| ----------------- | ------ | ---------------------------------------------------------------------- |
| filename          | string | Filename to resize, the images directory is `assets/full`.             |
| width             | number | Resize to specific width.                                              |
| height            | number | Resize to specific height.                                             |
| format (optional) | string | Format to save the image as (jpg, jpeg or png only). Default is `jpg`. |

All other params are required!
