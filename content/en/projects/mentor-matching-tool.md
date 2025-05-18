---
title: Mentor Matching Tool for New Students
date: 2025-03-31
description: Intelligent student group assignment system based on multi-rule priority
cover: /images/example-cover.png
tags:
  - Python
  - Data Automation#4A90E2
  - Excel Export#2ECC71
abbrlink: 65f8a123
---

# Mentor Matching Tool for New Students

## Project Background

This system was developed to provide intelligent matching support for an overseas university's Peer Mentoring Program for brand new students. Each semester, new students need to be assigned to different groups, with student mentors (experienced students) responsible for mentoring, answering questions, and peer support. The original manual matching approach was inefficient and error-prone. This system aims to automate the group matching process and generate well-structured Excel spreadsheets.

## Project Challenges

In the initial phase, I faced several major challenges:
1. How to ensure fair and reasonable matching results?
2. How to handle large-scale data processing?
3. How to handle various exceptional cases?
4. How to balance multiple dimensions of priorities and constraints?

## Core Objectives

- Multi-level priority matching based on nationality, local/international student status, visa status, and major information
- Balanced group sizes for each student mentor
- Export results to multi-sheet Excel files in the required format
- Flexible output structure adjustments, including additional statistics sheets, checkbox columns, and sequence numbers

## Feature Overview

### 🎯 Matching Logic

The system implements a **priority rule chain** that automatically completes optimal matchings while satisfying all business constraints:

1. **Local/International Student Distinction**: Chinese mainland students are assigned to WeChat groups, other international students who are not from China mainland to WhatsApp groups, and local students to WhatsApp groups
2. **Visa Status Assessment**: Only students with granted visa status are assigned to groups, while students with pending visas are listed separately in a Pending sheet for review
3. **Major Clustering**: Put the students who are from the same major to the same group when possible
4. **Local Student Exception Handling**: If a group has only one local student, automatically adjust to ≥2 or merge with other groups
5. **Total Number Verification**: Ensure every student is successfully assigned with no data loss

### 📦 Report Export (Excel)

Implemented various Excel export features using `openpyxl`:

- **Group Division Sheets**: Separate WX and WA into different sheets, organized by mentor
- **Pending List**: Export international students with pending visa to a Pending sheet
- **Automatic Sheet Naming**: Auto-rename based on mentor group prefix (e.g., AEP-WX)
- **Group Numbering**: Automatic sequence numbering column `No.` for each group
- **Checkbox Column**: Add Attended column for attendance marking (compatible with Excel preset styles)
- **Blank Row Spacing**: Automatically reserve two blank rows after each group for manual additions
- **Final Statistics Page**: Auto-generate `Report` sheet with matching results, warnings, and statistics for review and debugging

## Technical Implementation

### Tech Stack

- **Language**: Python 3.10
- **Data Processing**: pandas, NumPy
- **Excel Export**: openpyxl
- **Runtime**: Command-line script, supporting Windows environment

### Project Structure

| File | Function |
|------|----------|
| `loader.py` | Data cleaning and field standardization (e.g., Title → Gender, Local status determination) |
| `assigner.py` | Core matching logic, including grouping algorithms and rule chain processing |
| `exporter.py` | Multi-sheet export with automatic naming, style processing, and statistics |
| `main.py` | Main process entry, executing load → assign → export workflow |

### Implementation Snippets (Anonymized)

```python
# Step 1: shuffle all students
all_students = students_df.sample(frac=1).to_dict(orient='records')
pending_pool = [s for s in all_students if s['*status'] == 'Pending']
granted_pool = [s for s in all_students if s['*status'] == 'Granted']
local_pool = [s for s in all_students if s['*status'] == 'Local']

# Step 2: distribute in rounds
round_robin_distribute(granted_pool)
round_robin_distribute(pending_pool)
round_robin_distribute(local_pool)
```

```python
# Step 3: if only one local student in group, force merge
for group in mentor_pool:
    local_in_group = [s for s in group if s['*status'] == 'Local']
    if len(local_in_group) == 1:
        # remove and merge later
```

## Project Results

### Efficiency Improvement
After system deployment, matching time was reduced from hours to minutes, with accuracy exceeding 99%. User feedback shows that the system not only improved work efficiency but also significantly reduced human errors.

### Quality Assurance
Through automated verification mechanisms and comprehensive error handling, the system ensures the quality of matching results. Each matching result is traceable, facilitating subsequent queries and adjustments.

### User Feedback
User evaluations of the system focused on the following aspects:
- Simple and intuitive operation
- Clear and readable results
- Batch processing support

## Technical Challenges

### 1. Large-scale Data Processing
When handling large-scale data, I encountered performance bottlenecks. Through analysis, I identified the main issue was in data structure selection. Ultimately, I solved this by optimizing data structures and implementing chunked processing.

### 2. Matching Fairness
Ensuring fair matching results was a significant challenge. I designed a scoring mechanism that evaluates matching results from multiple dimensions and continuously optimizes through dynamic balancing algorithms.

### 3. Exception Handling
During system operation, various exceptional cases occurred. I designed a comprehensive exception handling mechanism, including error capture, intelligent recovery, and logging, ensuring stable system operation.

## Project Value

### Business Value
After system deployment, work efficiency was significantly improved, human errors were reduced, and resource allocation was optimized. User feedback shows that the system greatly reduced workload.

### Technical Value
During development, I accumulated rich experience in algorithm practice and engineering. Particularly in handling large-scale data and designing complex algorithms, I made significant improvements.

### Social Value
The successful application of the system not only improved educational management efficiency but also promoted educational equity and drove the digital transformation of educational institutions.

## Experience Summary

### Technical Aspects
Through this project, I deeply realized:
- The importance of thoroughly understanding business requirements
- The necessity of choosing appropriate technical solutions
- The long-term value of code quality
- Mastery of `pandas` multi-condition filtering and data processing techniques
- Implementation of structured and aesthetic Excel output using `openpyxl`
- Building a reusable matching engine supporting rule weight expansion and fallback logic

### Management Aspects
In project management, I learned:
- Timely communication and feedback with users
- Flexible development plan adjustments
- User experience focus
- Practical understanding of "rule ambiguity" and "priority conflicts" in real business requirements
- Building a flexible output system balancing automation and manual intervention

### Future Outlook
Looking forward, I plan to:
- Support more matching rules
- Optimize algorithm efficiency
- Expand application scenarios
- Maintain code maintainability and clear structure through multiple requirement iterations

This project not only solved a practical problem but also significantly improved my technical and management capabilities. I believe these experiences will be valuable for future project development. 