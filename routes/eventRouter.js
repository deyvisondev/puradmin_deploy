const express = require("express");
const router = express.Router();
const { addIssue, allIssueMotive, createIssue, getIssue, editIssue, deleteIssue } = require("../controllers/eventIssuesController")
const { addEvent, createEvent, allEvents, editEvent, getEvent, deleteEvent } = require("../controllers/eventController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")
const { getUserData } = require("../middleware/userDataMiddleware")


// Events
router.get("/admin/event-create", redirecLogin, getUserData, addEvent)
router.post("/admin/event-create", redirecLogin, getUserData, createEvent)
router.get("/admin/event-list", redirecLogin, getUserData, allEvents)
router.get("/admin/event-edit/:event_id", redirecLogin, getUserData, getEvent)
router.post("/admin/event-edit/:event_id", redirecLogin, getUserData, editEvent)
router.post("/admin/event-delete/", redirecLogin, getUserData, deleteEvent)








// Issues
router.get("/admin/event-issue-list", redirecLogin, getUserData, allIssueMotive)
router.get("/admin/event-issue-create", redirecLogin, getUserData, addIssue)
router.post("/admin/event-issue-create", redirecLogin, getUserData, createIssue)
router.get("/admin/event-issue-edit/:issue_id", redirecLogin, getUserData, getIssue)
router.post("/admin/event-issue-edit/:issue_id", redirecLogin, getUserData, editIssue )
router.post("/admin/event-issue-delete", redirecLogin, getUserData, deleteIssue)

module.exports = router;