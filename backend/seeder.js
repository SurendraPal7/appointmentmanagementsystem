const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Treatment = require('./models/Treatment');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const treatments = [
    {
        title: 'Tulsi & Cardamom Tea',
        type: 'remedy',
        disease: 'Cold & Cough',
        description: 'A powerful immune-boosting tea that helps relieve sore throat and congestion.',
        steps: [
            'Boil 2 cups of water.',
            'Add 5-6 fresh Tulsi leaves.',
            'Crush 2 cardamom pods and add to the water.',
            'Simmer for 5-7 minutes.',
            'Strain and add honey while warm.'
        ],
        duration: '10 mins',
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        precautions: ['Avoid cold water immediately after drinking.']
    },
    {
        title: 'Turmeric Milk (Haldi Doodh)',
        type: 'remedy',
        disease: 'General Immunity / Pain',
        description: 'Golden milk is excellent for reducing inflammation, boosting immunity, and promoting good sleep.',
        steps: [
            'Warm 1 cup of milk.',
            'Add 1/2 teaspoon of turmeric powder.',
            'Add a pinch of black pepper (enhances turmeric absorption).',
            'Sweeten with honey or jaggery if desired.',
            'Drink warm before bedtime.'
        ],
        duration: '5 mins',
        image: 'https://images.unsplash.com/photo-1615485925763-867862f85410?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Swapping to a known good milk/spice like image, or re-using Ashwagandha one as placeholder if specific one fails, but let's try a generic golden milk one
        precautions: ['Do not consume excess turmeric if you have gallstones.']
    },
    {
        title: 'Ginger & Honey Paste',
        type: 'remedy',
        disease: 'Sore Throat',
        description: 'Ginger relieves inflammation while honey soothes the throat lining.',
        steps: [
            'Extract juice from fresh ginger.',
            'Mix 1 teaspoon ginger juice with 1 teaspoon honey.',
            'Consume slowly.'
        ],
        duration: '2 mins',
        image: 'https://images.unsplash.com/photo-1622396342898-75fd2c2cc950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Tried and tested Ginger image
        precautions: ['Avoid if you have acidity issues.']
    },
    {
        title: 'Triphala Churna',
        type: 'treatment',
        disease: 'Indigestion / Constipation',
        description: 'A traditional Ayurvedic herbal formulation consisting of three fruits to aid digestion and detoxification.',
        steps: [
            'Take 1 teaspoon of Triphala powder.',
            'Mix in a glass of warm water.',
            'Drink at night before sleep.'
        ],
        duration: 'Regularly at night',
        image: 'https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        precautions: ['Consult a doctor for long-term use.']
    },
    {
        title: 'Panchakarma Therapy',
        type: 'treatment',
        disease: 'Detoxification',
        description: 'A comprehensive detoxification process to cleanse the body of toxins and restore balance.',
        steps: [
            'Consultation with Ayurvedic Doctor.',
            'Preparation (Oleation & Fomentation).',
            'Main Procedures (Vamana, Virechana, etc).',
            'Post-treatment rejuvenative therapy.'
        ],
        duration: '7 - 21 Days',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        precautions: ['Must be done under strict medical supervision.']
    },
    {
        title: 'Neem & Turmeric Paste',
        type: 'remedy',
        disease: 'Acne & Skin Infections',
        description: 'A powerful antibacterial and anti-inflammatory paste to clear acne and purify skin.',
        steps: [
            'Grind fresh neem leaves into a paste.',
            'Add 1/2 teaspoon of turmeric powder.',
            'Apply to affected areas.',
            'Leave for 20 minutes and wash with cool water.'
        ],
        duration: '20 mins',
        image: 'https://images.unsplash.com/photo-1598516087588-444453912698?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        precautions: ['Do an allergy patch test first.']
    },
    {
        title: 'Ashwagandha Milk',
        type: 'remedy',
        disease: 'Stress & Insomnia',
        description: 'Ashwagandha is an adaptogen that helps reduce stress and promotes deep, restful sleep.',
        steps: [
            'Mix 1 teaspoon of Ashwagandha powder in warm milk.',
            'Add a pinch of cardamom and honey.',
            'Drink 30 minutes before bed.'
        ],
        duration: 'Before Bed',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Ashwagandha / Root / Powder specific unique image
        precautions: ['Avoid during pregnancy.']
    },
    {
        title: 'Clove Oil Application',
        type: 'remedy',
        disease: 'Toothache',
        description: 'Clove oil contains eugenol, which is a natural anesthetic and antibacterial agent.',
        steps: [
            'Dip a cotton ball in clove oil.',
            'Place it directly on the aching tooth.',
            'Keep it for 10-15 minutes.',
            'Rinse mouth with warm salt water.'
        ],
        duration: '15 mins',
        image: 'https://images.unsplash.com/photo-1622642878426-6a56c07d570b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        precautions: ['Do not swallow the oil.']
    },
    {
        title: 'Amla Juice',
        type: 'remedy',
        disease: 'Hair Fall & Vision',
        description: 'Rich in Vitamin C, Amla strengthens hair follicles and improves eyesight.',
        steps: [
            'Take 20ml of fresh Amla juice.',
            'Mix with equal parts water.',
            'Drink strictly on an empty stomach in the morning.'
        ],
        duration: 'Daily Morning',
        image: 'https://images.unsplash.com/photo-1563227812-0ea4c3dc1624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        precautions: ['Avoid in case of hyperacidity.']
    },
    {
        title: 'Fennel Seeds (Saunf) Water',
        type: 'remedy',
        disease: 'Bloating & Gas',
        description: 'Fennel seeds relax the muscles in the gastrointestinal tract and reduce bloating.',
        steps: [
            'Soak 1 teaspoon fennel seeds in a glass of water overnight.',
            'Drink the water the next morning.',
            'Alternatively, chew raw seeds after meals.'
        ],
        duration: 'Overnight',
        image: 'https://images.unsplash.com/photo-1601648764658-ad3793640b8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        precautions: ['None usually.']
    }
];

const seedData = async () => {
    await connectDB();

    try {
        await Treatment.deleteMany(); // Clear existing
        await Treatment.insertMany(treatments);
        console.log('Treatments Seeding Complete!');
        process.exit();
    } catch (error) {
        console.error('Error Seeding Data:');
        if (error.errors) {
            Object.keys(error.errors).forEach(key => {
                console.error(`- ${key}: ${error.errors[key].message} (Value: ${error.errors[key].value})`);
            });
        } else {
            console.error(error);
        }
        process.exit(1);
    }
};

seedData();
