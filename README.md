# Cybersecurity Portfolio

This repository contains my personal cybersecurity portfolio website, built to showcase hands-on labs, security projects, and research focused on how attacks actually happen and how to realistically defend against them.

## About

I’m a cybersecurity student focused on incident response, digital forensics, and threat analysis. I don’t just like learning what attacks look like — I want to understand how they start, how they move through systems, and what it takes to detect and contain them in real environments.

This site is where I document that process through projects that simulate real-world scenarios and defensive workflows.

## Featured Projects

### Enterprise Attack Simulation Lab (Boro Manufacturing)

A multi-VM lab simulating a full attack chain:

* Phishing → credential compromise → SMB abuse
* Internal file access and data exposure
* Packet-level detection using Wireshark
* Incident response documentation and containment

### AI-Assisted Network Defense

Explores how machine learning and AI tools can support:

* Malicious traffic detection
* Pattern recognition in network data
* Defensive analysis workflows

Includes evaluation of detection performance and tradeoffs like false positives.

### Web Application Security Assessment

Security testing of a web application hosted on a Raspberry Pi:

* Enumeration using Nmap
* Vulnerability scanning with Nikto
* Request manipulation with Burp Suite
* Identification of CSRF and user enumeration issues
* Implementation of remediation strategies

### AI-Assisted Cryptanalysis

Research project analyzing how AI performs against classical encryption:

* Tested against the Vigenère cipher
* Evaluated impact of key length on accuracy
* Demonstrated limitations of AI-based cryptanalysis

## Mini Tools (Built Into Site)

The site also includes small browser-based security tools:

* Password strength checker + SHA-256 hashing
* URL phishing analyzer (rule-based)
* Image metadata inspector and scrubber
* File hash generator
* Browser security snapshot

All tools run locally in the browser — no data is uploaded or stored.

## Tech Stack

* Next.js
* React
* Tailwind CSS
* Vercel (deployment)

## Live Site

https://jordynbostick.com

## Notes

This repository is a cleaned public version of my portfolio.
Some project code and internal lab configurations are intentionally not included, but the full project writeups and results are available on the live site.

## Contact

If you want to connect, collaborate, or talk about cybersecurity:

* LinkedIn: https://www.linkedin.com/in/jordynbostick
* Email: [jordynritterbostick@gmail.com](mailto:jordynritterbostick@gmail.com)

---
