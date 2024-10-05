const express = require('express');
const app = express();

const rateLimitWindow = 15 * 60 * 1000; // 15 minutes window //
const maxRequests = 5; 

const requestCounts = {};

const rateLimiter = (req, res, next) => {
    const userIP = req.ip;
    const currentTime = Date.now();

    // initialize //
    if (!requestCounts[userIP]) {
        requestCounts[userIP] = {
            count: 1,
            startTime: currentTime
        };
    } else {
        const elapsedTime = currentTime - requestCounts[userIP].startTime;

        if (elapsedTime < rateLimitWindow) {
            requestCounts[userIP].count++;

            if (requestCounts[userIP].count > maxRequests) {
                // block if exceed //
                return res.status(429).json({ message: "Too many requests. Please try again later." });
            }
        } else {
            // reset count //
            requestCounts[userIP].count = 1;
            requestCounts[userIP].startTime = currentTime;
        }
    }

    next();
};

module.exports = rateLimiter;