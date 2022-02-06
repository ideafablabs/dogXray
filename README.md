# 🐾Dog X-ray Simulation
### The Chico Children's Musuem Veterinarian Dog X-ray Exhibit 
### by Idea Fab Labs

The Dog X-ray Simulation is exhibit located in the Chico Children's Musuem. The exhibit features a stuffed animal dog with embedded reed switches which are activated by an *imaging machine* (magnet) that the children can hold up to different areas of the dog.

These reed switches are attached to a Raspberry Pi's GPIO and runs a node server which delivers at static *MRI Display* page withc a socketIO client.  The GPIO switches are checked on a timeout by the server and any detected signal is sent through web sockets to the *MRI Display* page.  The client javascript then changes the image to an X-ray photo of the cooresponding part of the dog.

## Setup

*coming soon*

## Issues

* The raspberry pi web browser (chromium) cannot load larger image files from the local directory (4MB) we will have to go back to seperate images for each area. 
