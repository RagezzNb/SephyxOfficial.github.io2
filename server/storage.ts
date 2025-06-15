import { 
  users, products, cartItems, orders, orderItems, newsletter,
  type User, type InsertUser, type Product, type InsertProduct,
  type CartItem, type InsertCartItem, type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem, type Newsletter, type InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart methods
  getCartItems(userId: number): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;

  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;

  // Newsletter methods
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  isEmailSubscribed(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private newsletters: Map<number, Newsletter>;
  private currentUserId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;
  private currentNewsletterId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.newsletters = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    this.currentNewsletterId = 1;

    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "CYBER HOODIE X1",
        description: "Holographic mesh overlay with reactive LED strips",
        price: "299.00",
        category: "hoodies",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
        imageUrls: [
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Neon Green", "Cyber Purple", "Cyber Blue"],
        featured: true,
        inStock: true
      },
      {
        name: "NEURAL JACKET",
        description: "Smart fabric with integrated circuit patterns",
        price: "599.00",
        category: "jackets",
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
        imageUrls: [
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Neon Green", "Cyber Purple"],
        featured: true,
        inStock: true
      },
      {
        name: "QUANTUM KICKS",
        description: "Anti-gravity sole with holographic panels",
        price: "799.00",
        category: "shoes",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
        imageUrls: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800"
        ],
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["Black", "Neon Green", "Cyber Blue"],
        featured: true,
        inStock: true
      },
      {
        name: "MATRIX TEE",
        description: "Data-stream graphic print",
        price: "149.00",
        category: "tees",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
        imageUrls: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Neon Green"],
        inStock: true
      },
      {
        name: "TACTICAL CARGO",
        description: "Multi-dimensional pockets",
        price: "399.00",
        category: "pants",
        imageUrl: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800",
        imageUrls: [
          "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800"
        ],
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["Black", "Dark Gray"],
        inStock: true
      },
      {
        name: "CYBER VISOR",
        description: "AR-ready smart glasses",
        price: "1299.00",
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
        imageUrls: [
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"
        ],
        sizes: ["One Size"],
        colors: ["Black", "Cyber Blue"],
        inStock: true
      },
      {
        name: "HOLO PACK",
        description: "Iridescent tech backpack",
        price: "349.00",
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
        imageUrls: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
        ],
        sizes: ["One Size"],
        colors: ["Holographic", "Black"],
        inStock: true
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async getCartItems(userId: number): Promise<(CartItem & { product: Product })[]> {
    const userCartItems = Array.from(this.cartItems.values()).filter(item => item.userId === userId);
    const cartItemsWithProducts = userCartItems.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product not found for cart item ${item.id}`);
      }
      return { ...item, product };
    });
    return cartItemsWithProducts;
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartItemId++;
    const cartItem: CartItem = {
      ...insertCartItem,
      id,
      createdAt: new Date()
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedCartItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedCartItem);
    return updatedCartItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId: number): Promise<boolean> {
    const userCartItems = Array.from(this.cartItems.entries()).filter(([, item]) => item.userId === userId);
    userCartItems.forEach(([id]) => this.cartItems.delete(id));
    return true;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentOrderItemId++;
    const orderItem: OrderItem = {
      ...insertOrderItem,
      id
    };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const newsletter: Newsletter = {
      ...insertNewsletter,
      id,
      subscribedAt: new Date()
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    return Array.from(this.newsletters.values()).some(sub => sub.email === email);
  }
}

export const storage = new MemStorage();
