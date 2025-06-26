
import Property from '../model/Property.model.js';
export const registerProperty = async(req, res) => {
    try {
        //  check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'User is not authenticated' });
        }
        // Extract property details from request body
        const {propertyTitle, description, price, location, images} = req.body;

        // Validate required fields
        if (!propertyTitle || !description || !price || !location || !images || images.length === 0) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new property object
        const newProperty = await Property.create({
            propertyTitle,
            description,
            price,
            location,
            images,
            owner: req.user.id // Associate property with authenticated user
        })

        // Return success response
        res.status(201).json({
            message: 'Property registered successfully',
            property: {
                id: newProperty._id,
                propertyTitle: newProperty.propertyTitle,
                description: newProperty.description,
                price: newProperty.price,
                location: newProperty.location,
                images: newProperty.images,
                owner: newProperty.owner
            }
        });
    } catch (error) {
        console.error('Error registering property:', error);
        res.status(500).json({ message: 'Error registering property' });
    }
}

export const getProperties = async (req, res) => {
    try {
        // check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'User is not authenticated' });
        }
        // Fetch all properties from the database

        const properties = await Property.find().populate('owner', 'name email');

        // Return success response with properties
        res.status(200).json({
            message: 'Properties fetched successfully',
            properties: properties.map(property => ({   
                id: property._id,
                propertyTitle: property.propertyTitle,
                description: property.description,
                price: property.price,
                location: property.location,
                images: property.images,
                owner: {
                    id: property.owner._id,
                    name: property.owner.name,
                    email: property.owner.email
                }
            }))
        });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Error fetching properties' }); 
    }
}

export const getPropertyById = async (req, res) => {
    try {
        // check if user is authenticated

        console.log('User:', req.user);
        
        if(!req.user) {
            return res.status(401).json({ message: 'User is not authenticated' });
        }
        // Extract property ID from request parameters
        const propertyId = req.params.id;

        // Fetch property by ID from the database
        const property = await Property.findById(propertyId).populate('owner', 'name email');

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        // Return success response with property details
        res.status(200).json({
            message: 'Property fetched successfully',
            property: {
                id: property._id,
                propertyTitle: property.propertyTitle,
                description: property.description,
                price: property.price,  
                location: property.location,
                images: property.images,                
                owner: {
                    id: property.owner._id,
                    name: property.owner.name,
                    email: property.owner.email
                }
            }
        })
                
        
    } catch (error) {
        console.error('Error fetching property by ID:', error);
        res.status(500).json({ message: 'Error fetching property by ID' });
    }
}

export const updatePropertyById = async (req, res) => {
   try {
     //  check if user is authenticated
     if (!req.user) {
         return res.status(401).json({ message: 'User is not authenticated' });
     }

    //  Extract property ID from request parameters

    const propertyId = req.params.id;

    // Fetch property by ID from the database

    const property = await Property.findById(propertyId);
    if (!property) {
        return res.status(404).json({ message: 'Property not found' });
    }
    // Update property details with request body
    const { propertyTitle, description, price, location, images } = req.body;
    if (!propertyTitle || !description || !price || !location || !images || images.length === 0) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        {
            propertyTitle,
            description,
            price,
            location,
            images,
            updatedAt: Date.now() // Update the timestamp
        },
        { new: true } // Return the updated document
    ).populate('owner', 'name email');

    if (!updatedProperty) {
        return res.status(404).json({ message: 'Property not found' });
    }
    // Return success response with updated property details
    res.status(200).json({
        message: 'Property updated successfully',
        property: {
            id: updatedProperty._id,
            propertyTitle: updatedProperty.propertyTitle,
            description: updatedProperty.description,
            price: updatedProperty.price,
            location: updatedProperty.location,
            images: updatedProperty.images,
            owner: {
                id: updatedProperty.owner._id,
                name: updatedProperty.owner.name,
                email: updatedProperty.owner.email
            }
        }
    });

   } catch (error) {
       console.error('Error updating property by ID:', error);
       res.status(500).json({ message: 'Error updating property by ID' });
   }

}

export const deletePropertyById = async (req, res) => {
    try {
        // check if user is authenticated
        if(!req.user){
            return res.status(401).json({Message: 'User is not authenticated'});
        }
        // Extract property ID from request parameters
        const propertyId = req.params.id;
        // Fetch property by ID from the database
        const property = await Property.findById(propertyId).populate('owner', 'name email');
        console.log('Property to delete:', property);
        
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        // Delete property from the database
        await Property.findByIdAndDelete(propertyId);
        console.log('Property deleted successfully:', property._id);
        // Return success response with deleted property details
        res.status(200).json({
            message: 'Property deleted successfully',
            property: {
                id: property._id,
                propertyTitle: property.propertyTitle,
                description: property.description,
                price: property.price,
                location: property.location,
                images: property.images,
                owner: {
                    id: property.owner._id,
                    name: property.owner.name,
                    email: property.owner.email
                }
            }
        });
    } catch (error) {
        console.error('Error deleting property by ID:', error);
        res.status(500).json({ message: 'Error deleting property by ID' });
    }
}

