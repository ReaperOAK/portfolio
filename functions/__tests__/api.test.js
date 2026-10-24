const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('environment');
    });
  });

  describe('POST /contact', () => {
    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/contact')
        .send({})
        .expect(400);
      
      expect(response.body).toHaveProperty('error', 'Validation failed');
      expect(response.body).toHaveProperty('details');
      expect(Array.isArray(response.body.details)).toBe(true);
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .post('/contact')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          message: 'Test message'
        })
        .expect(400);
      
      expect(response.body).toHaveProperty('error', 'Validation failed');
      expect(response.body).toHaveProperty('details');
      expect(Array.isArray(response.body.details)).toBe(true);
    });

    it('should reject spam (honeypot triggered)', async () => {
      const response = await request(app)
        .post('/contact')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
          website: 'spam-content'  // This is the honeypot field
        })
        .expect(400);
      
      expect(response.body).toHaveProperty('error', 'Validation failed');
    });

    // Note: This test would require mocking the email service
    // since we don't want to send actual emails during testing
    it.skip('should send email with valid data', async () => {
      const response = await request(app)
        .post('/contact')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message from the automated test suite.'
        })
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Rate Limiting', () => {
    it('should rate limit contact form submissions', async () => {
      const contactData = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message'
      };

      // Make multiple rapid requests to trigger rate limiting
      const promises = Array(4).fill().map(() => 
        request(app).post('/contact').send(contactData)
      );

      const responses = await Promise.all(promises);
      
      // Some requests should be rate limited (429 status)
      const rateLimited = responses.filter(res => res.status === 429);
      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });

  describe('Security Headers', () => {
    it('should include security headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.headers).toHaveProperty('x-content-type-options', 'nosniff');
      // Helmet defaults to SAMEORIGIN, not DENY
      expect(response.headers).toHaveProperty('x-frame-options', 'SAMEORIGIN');
      // Modern Helmet sets x-xss-protection to 0 (deprecated header)
      expect(response.headers).toHaveProperty('x-xss-protection', '0');
    });
  });
});
