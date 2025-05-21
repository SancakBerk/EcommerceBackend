import { Firestore, doc, setDoc, collection } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// Firebase yapılandırması
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: process.env.FIREBASE_AUTH_URI,
  tokenUri: process.env.FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

// Ortak görüntü URL’si
const imageUrl =
  'https://i5.walmartimages.com/seo/Poedagar-Men-Watch-Luxury-Business-Quartz-Watches-Stainless-Stain-Strap-Sport-Chronograph-Men-39-s-Wristwatch-Waterproof-Luminous-Quartz-Wristwatches_7b31bf36-11cf-4c68-8dfd-e630bc9a93f6.284ee349d31df69a9da1c2d294e2aade.jpeg';

// Dummy veriler
const users = [
  {
    email: 'berksancak61@hotmail.com',
    password: '346157.Berk',
    name: 'Berk Sancak',
  },
  {
    email: 'ayse.demir@example.com',
    password: 'Password123',
    name: 'Ayşe Demir',
  },
  {
    email: 'mehmet.yilmaz@example.com',
    password: 'Mehmet2025',
    name: 'Mehmet Yılmaz',
  },
];

const ongoingItems = [
  {
    itemId: 123,
    documentId: 'item_123',
    title: 'Yeni Sezon İndirimi',
    description: 'Tüm saatlerde %20 indirim!',
    imageUrl: imageUrl,
    date: 1698765432000,
    link: 'https://example.com/campaign',
    author: 'Berk Sancak',
    authorImageUrl: imageUrl,
  },
  {
    itemId: 124,
    documentId: 'item_124',
    title: 'Kış Koleksiyonu',
    description: 'Yeni kış saat koleksiyonu şimdi stoklarda!',
    imageUrl: imageUrl,
    date: 1701367032000,
    author: 'Ayşe Demir',
    authorImageUrl: imageUrl,
  },
];

const categories = [
  {
    categoryId: 1,
    documentId: 'category_1',
    name: 'Saatler',
    slug: 'saatler',
    subCategories: [
      {
        categoryId: 2,
        documentId: 'category_2',
        name: 'Erkek Saatleri',
        slug: 'erkek-saatleri',
        imageUrl: imageUrl,
        description: 'Erkek saat modelleri',
        parentId: 1,
      },
      {
        categoryId: 3,
        documentId: 'category_3',
        name: 'Kadın Saatleri',
        slug: 'kadin-saatleri',
        imageUrl: imageUrl,
        description: 'Kadın saat modelleri',
        parentId: 1,
      },
    ],
    imageUrl: imageUrl,
    description: 'Tüm saat modelleri',
  },
  {
    categoryId: 4,
    documentId: 'category_4',
    name: 'Aksesuarlar',
    slug: 'aksesuarlar',
    imageUrl: imageUrl,
    description: 'Takı ve aksesuarlar',
  },
];

const products = [
  {
    productId: 1,
    documentId: 'product_1',
    name: 'Seeker Deep Blue Saat',
    description: 'Şık ve dayanıklı erkek saati.',
    price: 299.99,
    category: 'Erkek Saatleri',
    stock: 50,
    imageUrl: [imageUrl],
    date: 1698765432000,
    discountPercentage: 10,
    categoryId: 2,
    parentCategoryId: 1,
    averageStars: 4.5,
  },
  {
    productId: 2,
    documentId: 'product_2',
    name: 'Rose Gold Kadın Saati',
    description: 'Zarif kadın saati.',
    price: 199.99,
    category: 'Kadın Saatleri',
    stock: 30,
    imageUrl: [imageUrl],
    date: 1698765432000,
    categoryId: 3,
    parentCategoryId: 1,
    averageStars: 4.8,
  },
];

const cartItems = [
  {
    cartItemId: 1,
    documentId: 'cart_1',
    userId: 1,
    product: products[0],
    quantity: 2,
  },
  {
    cartItemId: 2,
    documentId: 'cart_2',
    userId: 2,
    product: products[1],
    quantity: 1,
  },
];

const orders = [
  {
    orderId: 1,
    documentId: 'order_1',
    userId: 1,
    items: [cartItems[0]],
    totalAmount: 539.98,
    status: 'pending',
    createdAt: 1698765432000,
    shippingAddress: {
      street: '1234 Örnek Sokak',
      city: 'İstanbul',
      country: 'Türkiye',
      postalCode: '34000',
    },
    paymentMethod: 'creditCard',
  },
];

const reviews = [
  {
    reviewId: 1,
    documentId: 'review_1',
    productId: 1,
    userId: 1,
    userName: 'Berk Sancak',
    userImageUrl: imageUrl,
    reviewDate: 1698765432000,
    reviewText: 'Harika bir saat, çok memnunum!',
    givenStars: 5,
    reviewLikes: 10,
    reviewDislikes: 0,
    reviewReplies: [
      {
        reviewId: 2,
        documentId: 'review_2',
        productId: 1,
        userId: 2,
        userName: 'Ayşe Demir',
        userImageUrl: imageUrl,
        reviewDate: 1698765532000,
        reviewText: 'Kesinlikle katılıyorum!',
        givenStars: 5,
        reviewLikes: 3,
        reviewDislikes: 0,
      },
    ],
  },
];

// Verileri Firestore’a ekleme fonksiyonu
async function seedFirestore() {
  try {
    // Users
    for (const user of users) {
      await setDoc(doc(db, 'users', `user_${users.indexOf(user) + 1}`), {
        ...user,
        userId: users.indexOf(user) + 1, // userId ekle
      });
      console.log(`User ${user.email} eklendi`);
    }

    // Ongoing Items
    for (const item of ongoingItems) {
      await setDoc(doc(db, 'ongoing-items', item.documentId), item);
      console.log(`Ongoing Item ${item.title} eklendi`);
    }

    // Categories
    for (const category of categories) {
      await setDoc(doc(db, 'categories', category.documentId), category);
      console.log(`Category ${category.name} eklendi`);
      if (category.subCategories) {
        for (const subCategory of category.subCategories) {
          await setDoc(
            doc(db, 'categories', subCategory.documentId),
            subCategory,
          );
          console.log(`SubCategory ${subCategory.name} eklendi`);
        }
      }
    }

    // Products
    for (const product of products) {
      await setDoc(doc(db, 'products', product.documentId), product);
      console.log(`Product ${product.name} eklendi`);
    }

    // Cart Items
    for (const cartItem of cartItems) {
      await setDoc(doc(db, 'cart-items', cartItem.documentId), cartItem);
      console.log(`Cart Item ${cartItem.cartItemId} eklendi`);
    }

    // Orders
    for (const order of orders) {
      await setDoc(doc(db, 'orders', order.documentId), order);
      console.log(`Order ${order.orderId} eklendi`);
    }

    // Reviews
    for (const review of reviews) {
      await setDoc(doc(db, 'reviews', review.documentId), review);
      console.log(`Review ${review.reviewId} eklendi`);
      if (review.reviewReplies) {
        for (const reply of review.reviewReplies) {
          await setDoc(doc(db, 'reviews', reply.documentId), reply);
          console.log(`Review Reply ${reply.reviewId} eklendi`);
        }
      }
    }

    console.log('Tüm veriler başarıyla eklendi!');
  } catch (error) {
    console.error('Veri ekleme hatası:', error);
  }
}

// Betiği çalıştır
seedFirestore();
