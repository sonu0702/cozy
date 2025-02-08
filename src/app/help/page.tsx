"use client"
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { IconChevronDown, IconMail } from '@tabler/icons-react';

export default function HelpPage() {
    const handleContactClick = () => {
        window.location.href = 'mailto:support@whizcozy.com';
    };

    return (
        <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Help Center
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
                Frequently Asked Questions
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<IconChevronDown />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>How can I contact help?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Please email us at support@whizcozy.com
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<IconChevronDown />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography>How to download multiple Invoices at once?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We are working on this feature. For now, please contact us at support@whizcozy.com and we will reply within 24 hours.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box sx={{ 
                mt: 6, 
                p: 4, 
                bgcolor: 'background.paper', 
                borderRadius: 2,
                textAlign: 'center'
            }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Need More Help?
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    Our support team is always here to help you.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<IconMail />}
                    onClick={handleContactClick}
                    size="large"
                >
                    Contact Support
                </Button>
            </Box>
        </Box>
    );
}