Lesson App Backend

Description: REST API for managing after-school lessons and orders.
Tech: Node.js, Express, MongoDB, CORS
Endpoints:

GET / → Test route
GET /lessons → List all lessons
PUT /lessons/:id → Update lesson by _id
POST /checkout → Insert order (spaces update may need minor fix)
Live URL: https://lesson-app-backend-pbex.onrender.com

GitHub Repository: https://github.com/Zoz0chan/lesson-app-backend
MongoDB Collections: 
lessons → exported as after_school_classes.lessons
orders → dynamically created when POST /checkout is used. If no orders exist yet, the collection is empty.

Postman Requests:
Exported as Postman-requests.json
