import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Separator } from '@radix-ui/react-select';
import { Badge, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Textarea } from './ui/textarea';

export default function CommentSection() {


    const [comments] = React.useState([
        {
            id: 1,
            user: {
                name: "Sarah Johnson",
                avatar: "/api/placeholder/32/32"
            },
            rating: 5,
            date: "2 days ago",
            content: "Absolutely love this product! The quality is outstanding and it exceeded my expectations. Would definitely recommend to others.",
            likes: 12,
            dislikes: 1,
            verified: true
        },
        {
            id: 2,
            user: {
                name: "Mike Smith",
                avatar: "/api/placeholder/32/32"
            },
            rating: 4,
            date: "1 week ago",
            content: "Great product overall. The only minor issue is the delivery took a bit longer than expected, but the quality makes up for it.",
            likes: 8,
            dislikes: 2,
            verified: true
        }
    ]);
    const [newComment, setNewComment] = React.useState("");


    // TODO: Implement comment submission

    return (
        <Card className="w-full lg:w-80">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Customer Reviews
                    <Badge>
                        {comments.length} reviews
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Add New Comment */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Button
                                key={star}
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto"
                            >
                                <Star
                                    className="h-4 w-4"
                                    fill={star <= 4 ? "gold" : "transparent"}
                                />
                            </Button>
                        ))}
                    </div>
                    <Textarea
                        placeholder="Write your review..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="resize-none"
                    />
                    <Button className="w-full">
                        Submit Review
                    </Button>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="space-y-2">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={comment.user.avatar} />
                                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{comment.user.name}</span>
                                            {comment.verified && (
                                                <Badge className="text-xs">
                                                    Verified
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="flex">
                                                {Array(5).fill(0).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="h-3 w-3"
                                                        fill={i < comment.rating ? "gold" : "transparent"}
                                                    />
                                                ))}
                                            </div>
                                            <span>·</span>
                                            <span>{comment.date}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <p className="text-sm">{comment.content}</p>
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="text-muted-foreground">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {comment.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-muted-foreground">
                                    <ThumbsDown className="h-4 w-4 mr-1" />
                                    {comment.dislikes}
                                </Button>
                            </div>
                            <Separator />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};


// export default CommentSection
